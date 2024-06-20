import Cards from "../../components/Homepage/Cards";
import { motion } from "framer-motion";
const fadeIn = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: (index) => ({
    opacity: 1,
    y: 0,

    transition: {
      delay: 0.2 * index,
      duration: 0.9,
    },
  }),
};
const CodeBlocks = () => {
  const cardHeadings = [
    {
      title: "Web Development",
      description:
        "Our web development courses cover everything from HTML and CSS to advanced JavaScript frameworks. Learn to build responsive and dynamic websites from scratch with guidance from industry professionals.",
    },
    {
      title: "Machine Learning",
      description:
        "Dive into the world of AI with our machine learning courses. Understand the fundamentals, explore various algorithms, and apply them to real-world datasets. Gain hands-on experience with expert-led projects.",
    },
    {
      title: "MERN Stack",
      description:
       "Master full-stack development with our MERN Stack courses. Learn to create powerful web applications using MongoDB, Express.js, React, and Node.js, with practical examples and industry insights.",
    },
    {
      title:  "Cloud Computing",
      description:
       "Unlock the power of the cloud with our comprehensive cloud computing courses. Learn to deploy and manage applications on top cloud platforms, understand cloud architecture, and gain skills in cloud security and scalability.",
    },
  ];

  return (
    <div className=" relative mx-auto      ">
      <div
        className={`tracking-[3px] max-w-[50rem] mx-auto font-sans uppercase  ${
          window.innerWidth >= 590
            ? "bg-gradient-to-b from-white via-white to-black/40 bg-clip-text text-transparent"
            : "text-white"
        } select-none font-bold text-sm lg:text-lg mb-[5rem] lg:mb-[6rem] mt-[5rem]`}
      >
        <h2 className="text-center">
          Unlock your coding potential with our online courses
        </h2>
      </div>

      <div className=" flex flex-wrap max-w-[1200px]  gap-10 justify-center mx-auto ">
        {cardHeadings.map((value, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            <Cards key={index} head={value} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CodeBlocks;
