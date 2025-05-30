
import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; dx: number; dy: number }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
      });
    }

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#9b87f5";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fadeUpAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const floatingAnimation = {
    y: [-10, 10],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-purple-900/20 to-black px-4 md:px-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 hidden md:block"
          animate={floatingAnimation}
        >
          <Sparkles className="w-8 h-8 text-purple-400/50" />
        </motion.div>
        <motion.div 
          className="absolute top-1/3 right-1/4 hidden md:block"
          animate={floatingAnimation}
          transition={{ delay: 0.2 }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-sm" />
        </motion.div>
        <motion.div 
          className="absolute bottom-1/4 left-1/3 hidden md:block"
          animate={floatingAnimation}
          transition={{ delay: 0.5 }}
        >
          <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-purple-600/10 to-blue-600/10 rotate-45 blur-sm" />
        </motion.div>
      </div>

      <motion.div 
        className="relative z-10 text-center px-4 mt-16 space-y-6 max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-600 leading-tight"
          variants={fadeUpAnimation}
        >
          Mega AI
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto"
          variants={fadeUpAnimation}
          transition={{ delay: 0.2 }}
        >
          Transform your business with cutting-edge AI solutions. From voice bots to workflow automation,
          we bring intelligence to every interaction.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default HeroSection;
