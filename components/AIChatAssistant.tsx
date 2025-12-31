
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type, FunctionDeclaration, Modality } from "@google/genai";
import { Language } from '../types';
import { ASSETS, getBookingById, CONSULAR_SERVICES } from '../constants';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const trackApplicationFunctionDeclaration: FunctionDeclaration = {
  name: 'track_application',
  parameters: {
    type: Type.OBJECT,
    description: 'Get the status and details of a consular application using its Reference ID.',
    properties: {
      refId: {
        type: Type.STRING,
        description: 'The reference ID of the application (e.g., RIM-A1B2C3).',
      },
    },
    required: ['refId'],
  },
};

const AIChatAssistant: React.FC<{ language: Language }> = ({ language }) => {
  const isAr = language === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: isAr ? 'مرحباً بك في البوابة الذكية للقنصلية الموريتانية. أنا مساعدك الرقمي، كيف يمكنني خدمتك اليوم؟ يمكنك سؤالي عن المتطلبات، تتبع طلبك، أو حتى آخر الأخبار القنصلية.' : 'Welcome to the Mauritanian Consulate Smart Portal. I am your digital assistant. How may I assist you today? You can ask about requirements, track your application, or even get latest consular updates.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Phase 3: AI Voice Synthesis (TTS) - Decoding logic fixed for raw PCM data
  const speakText = async (text: string) => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Respond clearly as a diplomat: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: isAr ? 'Kore' : 'Zephyr' } },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const ctx = audioContextRef.current;
        
        // Manual base64 decoding following strict PCM data standards
        const binaryString = atob(base64Audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Processing raw PCM 16-bit audio as recommended
        const dataInt16 = new Int16Array(bytes.buffer);
        const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < dataInt16.length; i++) {
          channelData[i] = dataInt16[i] / 32768.0;
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => setIsSpeaking(false);
        source.start();
      } else {
        setIsSpeaking(false);
      }
    } catch (e) {
      console.error("TTS Error:", e);
      setIsSpeaking(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Fixed: Removed googleSearch tool as it cannot be used alongside functionDeclarations
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          tools: [
            { functionDeclarations: [trackApplicationFunctionDeclaration] }
          ],
          systemInstruction: `You are the Sovereign AI Envoy for the Mauritanian Consulate in Jeddah.
          - Role: Professional Consular Officer.
          - Capabilities: You can track applications using the provided tools.
          - Language: Respond in ${isAr ? 'Arabic' : 'English'}.
          - Personality: Diplomatic, helpful, and concise. Never use slang.`,
        },
      });

      if (response.functionCalls && response.functionCalls.length > 0) {
        for (const fc of response.functionCalls) {
          if (fc.name === 'track_application') {
            const booking = getBookingById(fc.args.refId as string);
            let resultContext = "";
            if (booking) {
              const service = CONSULAR_SERVICES.find(s => s.id === booking.serviceId);
              resultContext = `Status for ${booking.name}: Service is ${service?.titleAr || service?.titleEn}, Current Status: ${booking.status.toUpperCase()}, Scheduled for ${booking.date} at ${booking.time}.`;
            } else {
              resultContext = "No application found with this reference ID.";
            }
            
            const finalResponse = await ai.models.generateContent({
              model: 'gemini-3-flash-preview',
              contents: `Internal DB Result: ${resultContext}. Format this as a formal diplomatic response in ${isAr ? 'Arabic' : 'English'}.`,
            });
            setMessages(prev => [...prev, { role: 'model', text: finalResponse.text || "" }]);
          }
        }
      } else {
        setMessages(prev => [...prev, { role: 'model', text: response.text || "" }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: isAr ? 'عذراً، النظام مشغول حالياً.' : 'System currently busy.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-32 right-8 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[380px] md:w-[450px] h-[600px] bg-white rounded-[3rem] shadow-[0_50px_120px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden border border-gray-100 animate-fade-in">
          <div className="bg-mauritania-green p-8 flex justify-between items-center text-white relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                <img src={ASSETS.seal} alt="AI" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <p className="font-black text-lg leading-none mb-1">{isAr ? 'المساعد السيادي الذكي' : 'Sovereign AI Agent'}</p>
                <div className="flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full animate-pulse ${isSpeaking ? 'bg-mauritania-red' : 'bg-mauritania-gold'}`}></div>
                   <p className="text-[10px] text-mauritania-gold font-black uppercase tracking-widest">{isSpeaking ? 'Live Voice Output' : 'Secured AI Bridge'}</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="flex-grow p-8 overflow-y-auto space-y-6 bg-gray-50/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[90%] p-6 rounded-[2rem] text-sm font-bold leading-relaxed shadow-sm relative group ${
                  m.role === 'user' ? 'bg-mauritania-green text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                }`}>
                  {m.text}
                  {m.role === 'model' && (
                    <button 
                      onClick={() => speakText(m.text)}
                      className={`absolute -bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-gray-100 transition-all ${isSpeaking ? 'bg-mauritania-red text-white animate-pulse' : 'bg-white text-mauritania-green hover:scale-110'}`}
                    >
                      <i className={`fas ${isSpeaking ? 'fa-waveform' : 'fa-volume-up'}`}></i>
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 flex gap-2 shadow-inner">
                  <div className="w-2 h-2 bg-mauritania-green rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-mauritania-green rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-mauritania-green rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-6 bg-white border-t border-gray-100 flex gap-4">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isAr ? 'اسأل عن المتطلبات، المواعيد، أو القوانين...' : 'Ask about requirements, slots, or laws...'}
              className="flex-grow px-6 py-5 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-mauritania-green focus:bg-white outline-none text-gray-800 text-sm font-black transition-all shadow-inner"
            />
            <button onClick={handleSend} className="w-16 h-16 bg-mauritania-green text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-green-800 transition-all">
              <i className="fas fa-search text-xl"></i>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-24 h-24 bg-mauritania-green text-white rounded-[2rem] flex items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all group border-4 border-white/20 relative"
      >
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-mauritania-gold rounded-full border-2 border-white animate-pulse"></div>
        {isOpen ? <i className="fas fa-times text-3xl"></i> : <i className="fas fa-robot text-4xl"></i>}
      </button>
    </div>
  );
};

export default AIChatAssistant;
