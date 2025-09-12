import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { CheckCircle2, Circle } from "lucide-react";

const tasks = [
  {
    id: 1,
    title: "Create a user flow of social application design",
    status: "Approved",
    completed: true,
    type: "notes",
    color: "bg-green-100 text-green-700",
  },
  {
    id: 2,
    title: "Create a user flow of social application design",
    status: "In review",
    completed: true,
    type: "notes",
    color: "bg-red-100 text-red-600",
  },
  {
    id: 3,
    title: "Landing page design for Fintech project of Singapore",
    status: "In review",
    completed: true,
    type: "notes",
    color: "bg-red-100 text-red-600",
  },
  {
    id: 4,
    title: "Interactive prototype for app screens of deltamine project",
    status: "On going",
    completed: false,
    type: "other",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 5,
    title: "Interactive prototype for app screens of deltamine project",
    status: "Approved",
    completed: true,
    type: "other",
    color: "bg-green-100 text-green-700",
  },
];

const TodayTask = () => {
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });
  }, []);

  const filteredTasks =
    activeTab === "all"
      ? tasks
      : tasks.filter((task) => task.type === "notes");

  return (
    <motion.div
      className="bg-white shadow-md rounded-2xl p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      data-aos="fade-up"
    >
      {/* Header */}
      <h2 className="text-lg font-semibold text-indigo-900">Today task</h2>
      <br />

      {/* Tabs */}
      <div className="flex items-center gap-5 mb-6">
        <div className="flex gap-4 text-sm">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex gap-1 cursor-pointer ${
              activeTab === "all"
                ? "text-blue-600 border-b-2 border-blue-500 pb-1 "
                : "text-gray-600"
            }`}
          >
            All{" "}
            <span className="bg-gray-100 px-2 rounded-full">
              {tasks.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("notes")}
            className={`flex gap-1 cursor-pointer ${
              activeTab === "notes"
                ? "text-blue-600 border-b-2 border-blue-500 pb-1"
                : "text-gray-600"
            }`}
          >
            Notes{" "}
            <span className="bg-gray-100 px-2 rounded-full">
              {tasks.filter((t) => t.type === "notes").length}
            </span>
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-6">
        {filteredTasks.map((task) => (
          <motion.div
            key={task.id}
            className="flex items-center justify-between"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center gap-3">
              {task.completed ? (
                <CheckCircle2 className="text-orange-500 w-5 h-5" />
              ) : (
                <Circle className="text-gray-400 w-5 h-5" />
              )}
              <span className="text-sm text-gray-700">{task.title}</span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${task.color}`}
            >
              {task.status}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TodayTask;
