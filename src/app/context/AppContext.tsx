import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, Student, Task, ChatMessage } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  currentStudent: Student | null;
  students: Student[];
  tasks: Task[];
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  updateTaskStatus: (taskId: string, status: 'completed' | 'pending' | 'overdue') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Mock data
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@college.edu',
    role: 'student',
    course: 'B.Tech CSE',
    enrollment: '2026CSE045',
    semester: 1,
    completion: 65,
    riskLevel: 'low',
    tasksCompleted: 4,
    totalTasks: 6,
  },
  {
    id: '2',
    name: 'Riya Patel',
    email: 'riya.patel@college.edu',
    role: 'student',
    course: 'B.Tech ECE',
    enrollment: '2026ECE012',
    semester: 1,
    completion: 82,
    riskLevel: 'low',
    tasksCompleted: 5,
    totalTasks: 6,
  },
  {
    id: '3',
    name: 'Aman Singh',
    email: 'aman.singh@college.edu',
    role: 'student',
    course: 'B.Tech ME',
    enrollment: '2026ME034',
    semester: 1,
    completion: 45,
    riskLevel: 'medium',
    tasksCompleted: 3,
    totalTasks: 6,
  },
  {
    id: '4',
    name: 'Neha Gupta',
    email: 'neha.gupta@college.edu',
    role: 'student',
    course: 'B.Tech CSE',
    enrollment: '2026CSE078',
    semester: 1,
    completion: 28,
    riskLevel: 'high',
    tasksCompleted: 2,
    totalTasks: 6,
  },
  {
    id: '5',
    name: 'Priya Verma',
    email: 'priya.verma@college.edu',
    role: 'student',
    course: 'B.Tech IT',
    enrollment: '2026IT021',
    semester: 1,
    completion: 91,
    riskLevel: 'low',
    tasksCompleted: 6,
    totalTasks: 6,
  },
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Upload Documents',
    status: 'completed',
    description: 'Upload required documents for verification',
  },
  {
    id: '2',
    title: 'Pay Admission Fee',
    status: 'pending',
    dueDate: '3 days',
    description: 'Complete the admission fee payment before deadline',
  },
  {
    id: '3',
    title: 'Hostel Registration',
    status: 'pending',
    description: 'Register for hostel accommodation',
  },
  {
    id: '4',
    title: 'Orientation Form',
    status: 'completed',
    description: 'Fill out the orientation attendance form',
  },
  {
    id: '5',
    title: 'ID Card Application',
    status: 'pending',
    description: 'Apply for student ID card',
  },
  {
    id: '6',
    title: 'Library Registration',
    status: 'pending',
    description: 'Complete library registration process',
  },
];

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'initia',
    message: 'Hi Rahul! 👋 I\'m Initia, your AI onboarding assistant. I\'m here to help you navigate your college admission process smoothly. How can I help you today?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [students] = useState<Student[]>(mockStudents);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialMessages);

  const currentStudent = user?.role === 'student' 
    ? students.find(s => s.id === user.id) || null 
    : null;

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  };

  const updateTaskStatus = (taskId: string, status: 'completed' | 'pending' | 'overdue') => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        currentStudent,
        students,
        tasks,
        chatMessages,
        addChatMessage,
        updateTaskStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
