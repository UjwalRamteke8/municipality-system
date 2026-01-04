import { motion } from "framer-motion";
import { ClipboardList, MessageSquareText, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";

export const CitizenConnect = () => {
  const cards = [
    {
      title: "Report an Issue",
      icon: <ClipboardList className="w-10 h-10" />,
      link: "/services/new",
    },
    {
      title: "Share Your Suggestion / Query",
      icon: <MessageSquareText className="w-10 h-10" />,
      link: "/feedback",
    },
    {
      title: "Share Your Feedback",
      icon: <ThumbsUp className="w-10 h-10" />,
      link: "/feedback",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/4">
          <h2 className="text-4xl font-bold text-slate-900 font-serif leading-tight">
            Citizen <br /> <span className="text-[#9f1239]">Connect</span>
          </h2>
        </div>

        <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {cards.map((card, index) => (
            <Link to={card.link} key={index}>
              <motion.div
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-8 rounded-2xl bg-gray-50 border border-slate-100 hover:shadow-xl hover:bg-white transition-all cursor-pointer"
              >
                <div className="text-[#9f1239] opacity-80">{card.icon}</div>
                <h3 className="text-lg font-bold text-slate-800 leading-snug">
                  {card.title}
                </h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
