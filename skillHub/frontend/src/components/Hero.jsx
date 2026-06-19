import { motion } from "framer-motion";

function Hero() {

  return (

    <motion.section
      className="hero"

      initial={{
        opacity: 0,
        y: -50
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.8
      }}
    >

      <h1>
        Learn Modern Technology
      </h1>

      <p>
        Build Real World Applications
        using React, Java,
        Node JS and MERN Stack
      </p>

      <button>
        Start Learning
      </button>

    </motion.section>

  );
}

export default Hero;
