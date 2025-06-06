import React, { useState } from 'react';
import { ChevronRight, MessageCircle, Target, Zap, CheckCircle, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: Array<{
    text: string;
    value: number;
  }>;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Quando você vê uma mulher interessante, o que costuma fazer?",
    options: [
      { text: "Espero ela puxar assunto", value: 1 },
      { text: "Tento puxar papo, mas fico nervoso", value: 2 },
      { text: "Mando um elogio genérico", value: 2 },
      { text: "Sei o que dizer na hora certa", value: 4 }
    ]
  },
  {
    id: 2,
    question: "Com qual dessas situações você mais se identifica?",
    options: [
      { text: "Conversas que morrem rápido", value: 1 },
      { text: "Ela visualiza e não responde", value: 1 },
      { text: "Tenho medo de parecer inconveniente", value: 2 },
      { text: "Eu me garanto no papo", value: 4 }
    ]
  },
  {
    id: 3,
    question: "Você já pesquisou no Google ou no YouTube como puxar assunto com uma mulher?",
    options: [
      { text: "Sim, várias vezes", value: 2 },
      { text: "Sim, mas nunca achei algo prático", value: 3 },
      { text: "Não, mas preciso disso urgentemente", value: 1 },
      { text: "Não preciso, já sou bom nisso", value: 4 }
    ]
  },
  {
    id: 4,
    question: "Se você tivesse um guia com frases prontas e situações reais, você usaria?",
    options: [
      { text: "Com certeza, hoje mesmo!", value: 1 },
      { text: "Talvez, se fosse fácil de aplicar", value: 2 },
      { text: "Não sei", value: 3 },
      { text: "Não, prefiro improvisar", value: 4 }
    ]
  }
];

function App() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const startQuiz = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep('quiz');
      setIsAnimating(false);
    }, 300);
  };

  const handleAnswer = (value: number) => {
    setSelectedOption(value);
    setIsAnimating(true);
    
    setTimeout(() => {
      const newAnswers = [...answers, value];
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setCurrentStep('result');
      }
      setIsAnimating(false);
    }, 500);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const totalScore = answers.reduce((sum, score) => sum + score, 0);

  if (currentStep === 'intro') {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
            <div className="mb-8">
              <MessageCircle className="w-16 h-16 mx-auto mb-6 text-pink-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                🚨 Você Sabe Puxar Assunto Com Uma Mulher Sem Ser Chato ou Forçado?
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Descubra em menos de 60 segundos se você está fazendo tudo errado na hora de puxar assunto – e como corrigir isso com 42 formas prontas para usar!
              </p>
            </div>
            
            <button
              onClick={startQuiz}
              className="group bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center gap-3"
            >
              <Zap className="w-6 h-6" />
              Começar Quiz Agora
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-blue-200 text-sm mt-4">
              ⏱️ Leva apenas 1 minuto para completar
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'quiz') {
    const question = questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto w-full">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-200 text-sm font-medium">
                Pergunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className="text-blue-200 text-sm font-medium">
                {Math.round(progress)}% completo
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className={`bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20 transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="mb-8">
              <Target className="w-12 h-12 text-pink-400 mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {question.question}
              </h2>
              <p className="text-blue-200 text-sm">
                Escolha a opção que mais se identifica com você:
              </p>
            </div>

            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.value)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
                    selectedOption === option.value
                      ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20 border-pink-400 text-white'
                      : 'bg-white/5 border-white/20 text-blue-100 hover:bg-white/10 hover:border-white/40'
                  }`}
                >
                  <span className="font-medium">{option.text}</span>
                  {selectedOption === option.value && (
                    <CheckCircle className="w-5 h-5 text-pink-400 float-right mt-0.5" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'result') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                🧠 Seu Estilo de Conversa Está a Um Passo de Virar Jogo!
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed mb-8">
                Com base nas suas respostas, ficou claro que você ainda não está usando todo o seu potencial pra se conectar com uma mulher de forma natural e impactante.
              </p>
              <p className="text-lg text-blue-100 leading-relaxed mb-8">
                Por isso, criamos um material direto ao ponto com <span className="font-bold text-pink-300">42 Maneiras Pra Puxar Assunto Com Uma Mulher</span>, com frases prontas e estratégias que realmente funcionam.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border-2 border-green-400/50 rounded-2xl p-6 mb-8">
              <div className="text-green-300 font-bold text-2xl mb-2">
                Oferta Especial
              </div>
              <div className="text-white text-3xl font-bold">
                Apenas R$ 19,90
              </div>
              <div className="text-green-200 text-sm">
                (menos que um lanche!)
              </div>
            </div>

            <a
              href="https://pay.kiwify.com.br/BpiEPYF?afid=dYyrNpuO"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center gap-3 mb-4"
            >
              <CheckCircle className="w-6 h-6" />
              ✅ Quero Começar a Conversar do Jeito Certo
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>

            <p className="text-blue-200 text-xs">
              🔒 Compra 100% segura • 7 dias de garantia • Acesso imediato
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;