
import { PortfolioData } from './types';

export const INITIAL_DATA: PortfolioData = {
  profile: {
    fullName: "Mecdettin El Emin",
    initials: "ME",
    title: "Control & Automation Engineer",
    tagline: "Building autonomous systems that think and act.",
    about: "As a Control and Automation Engineering student at Yildiz Technical University, I am deeply passionate about the intersection of control theory and artificial intelligence. With a robust academic foundation and hands-on experience, including internships, as well as active involvement in technical projects such as TEKNOFEST and personal initiatives. I bridge the gap between academic research and industrial application.",
    email: "mecd2004@gmail.com",
    phone: "0534 922 30 20",
    location: "Istanbul, Turkey",
    linkedin: "https://linkedin.com/in/mecdettinelemin",
    github: "https://github.com",
    avatarUrl: "https://ui-avatars.com/api/?name=Mecdettin+El+Emin&background=9f1239&color=fff&size=256",
  },
  experience: [
    {
      id: "exp-1",
      role: "Model Based Control Systems Intern",
      company: "BAYKAR",
      period: "Jun 2025 – Aug 2025",
      location: "Istanbul, Turkey",
      description: "Focused on autonomous navigation and control algorithms for aerial vehicles.",
      highlights: [
        "Implemented path planning algorithms and simulated drone navigation on PX4 using ROS2.",
        "Optimized control loops for stability in simulated environments.",
        "Collaborated with the autonomy team to integrate vision-based navigation."
      ]
    },
    {
      id: "exp-2",
      role: "Project Management Intern",
      company: "BAYKAR",
      period: "Mar 2025 – Jun 2025",
      location: "Istanbul, Turkey",
      description: "Contributed to systems engineering activities and project lifecycle management.",
      highlights: [
        "Contributed to systems engineering activities, defining system requirements for new functionalities and improvements.",
        "Conducted trade-off analysis for sensor selection.",
        "Managed documentation for certification processes."
      ]
    },
    {
      id: "exp-3",
      role: "Engineer Intern",
      company: "DEVELOPED TECHNOLOGIES",
      period: "Jul 2023 – Oct 2023",
      location: "Istanbul, Turkey",
      description: "Developed User Interfaces and hardware-in-the-loop integration systems.",
      highlights: [
        "UI development using MATLAB App Designer.",
        "Arduino integration via MATLAB/Simulink.",
        "ESP32 web server setup using Arduino IDE."
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Quadruped Robot",
      tagline: "Graduation Project | Reinforcement Learning",
      description: "Training a quadruped robot for multi-terrain locomotion using Reinforcement Learning in the Genesis simulation environment. The project focuses on developing a robust policy that can handle slopes, stairs, and external perturbations.",
      technologies: ["Python", "Reinforcement Learning", "Genesis Sim", "PPO"],
      media: [
        { id: "m1", type: "image", url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800", caption: "Simulation Environment Preview" }
      ]
    },
    {
      id: "proj-2",
      title: "Unmanned Ground Vehicle",
      tagline: "TEKNOFEST Competition",
      description: "Served as Team Leader for the UGV competition. Implemented the control architecture and embedded system using STM32 microcontrollers. Designed the power distribution board and integrated LIDAR for SLAM.",
      technologies: ["STM32", "C/C++", "Control Theory", "PCB Design"],
      media: []
    },
    {
      id: "proj-3",
      title: "Reinforcement Learning Research",
      tagline: "Academic Research w/ Prof. Uğur Yıldıran",
      description: "Built Deep Q-Network (DQN) and Deep Deterministic Policy Gradient (DDPG) agents from scratch using PyTorch on OpenAI Gymnasium environments (LunarLander & Inverted Pendulum). Focused on understanding the mathematical foundations of policy gradients.",
      technologies: ["PyTorch", "OpenAI Gym", "Algorithms", "Mathematics"],
      media: []
    },
    {
      id: "proj-4",
      title: "Automated Guided Vehicle (AGV)",
      tagline: "WIND Team | TEKNOFEST 3rd Place 🏆",
      description: "Leader of the WIND Team. Designed and implemented Embedded and Control Systems for an AGV. Achieved 3rd place in the Digital Technologies in Industry Competition.",
      technologies: ["Embedded Systems", "Robotics", "Team Leadership"],
      media: []
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "Yildiz Technical University",
      degree: "Control And Automation Engineering",
      period: "2022 – Present",
      gpa: "3.48",
      description: "Focus on Control Theory, Artificial Intelligence, and Robotics."
    }
  ],
  skills: [
    {
      id: "skill-1",
      category: "Programming & Softwares",
      items: ["Python", "C / C++", "MATLAB", "Linux", "Git"]
    },
    {
      id: "skill-2",
      category: "AI & Machine Learning",
      items: ["Reinforcement Learning", "PyTorch", "TensorFlow", "OpenAI Gym", "Deep Learning"]
    },
    {
      id: "skill-3",
      category: "Embedded & Robotics",
      items: ["STM32", "Arduino", "ESP32", "ROS2", "Gazebo", "PX4"]
    },
    {
      id: "skill-4",
      category: "Languages",
      items: ["Arabic (Native)", "Turkish (Native)", "English (TOEFL 94)"]
    }
  ],
  lastUpdated: Date.now(),
};
