
import React, { useState, useEffect, useRef } from 'react';
import { PortfolioData, NavigationState, Experience, Project, SectionId, MediaItem, Education, SkillCategory } from './types';
import { INITIAL_DATA } from './constants';
import { savePortfolioData, getPortfolioData } from './services/storage';
import { improveText } from './services/geminiService';
import * as Icons from './components/Icons';
import { Divider, IslamicStar } from './components/IslamicPattern';

// --- Utilities ---

const generateId = () => Math.random().toString(36).substr(2, 9);

const Logo = ({ initials }: { initials: string }) => (
  <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-primary-900 text-gold-400 font-display font-bold text-lg shadow-lg border-2 border-gold-600 flex-shrink-0">
    <div className="absolute inset-0 border border-white/20 m-1"></div>
    {initials}
  </div>
);

// --- Components ---

const Button: React.FC<{ 
  onClick?: () => void; 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  className?: string;
  disabled?: boolean;
}> = ({ onClick, children, variant = 'primary', className = '', disabled }) => {
  const base = "px-4 py-2 font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider";
  const variants = {
    primary: "bg-primary-800 text-white hover:bg-primary-700 border border-primary-900 shadow-md hover:shadow-lg",
    secondary: "bg-paper text-primary-900 border border-primary-800 hover:bg-primary-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-primary-800 hover:bg-primary-100/50",
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`} disabled={disabled}>
      {children}
    </button>
  );
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center justify-center gap-4 mb-12">
    <div className="h-px bg-primary-200 flex-grow max-w-[100px]"></div>
    <h2 className="text-3xl md:text-4xl font-display text-primary-900 text-center">{children}</h2>
    <div className="h-px bg-primary-200 flex-grow max-w-[100px]"></div>
  </div>
);

// --- Page Sections ---

const HomeSection: React.FC<{ data: PortfolioData }> = ({ data }) => (
  <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center py-20 relative overflow-hidden">
     {/* Hero Content */}
    <div className="relative z-10 max-w-4xl mx-auto px-4 animate-fade-in">
      <div className="w-40 h-40 md:w-56 md:h-56 mx-auto rounded-full border-4 border-double border-primary-800 p-1 mb-8 shadow-2xl bg-white relative group">
        <div className="absolute inset-0 rounded-full border border-gold-500 animate-pulse"></div>
        <img 
          src={data.profile.avatarUrl} 
          alt={data.profile.fullName} 
          className="w-full h-full object-cover rounded-full filter contrast-110 group-hover:scale-105 transition-transform duration-700" 
        />
      </div>
      
      <h1 className="text-5xl md:text-7xl font-serif text-primary-900 mb-4 tracking-tight leading-tight">
        {data.profile.fullName}
      </h1>
      
      <div className="flex items-center justify-center gap-3 mb-6">
         <div className="h-px w-12 bg-gold-500"></div>
         <h2 className="text-xl md:text-2xl font-display text-primary-700 tracking-widest">
          {data.profile.title}
        </h2>
         <div className="h-px w-12 bg-gold-500"></div>
      </div>

      <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10 font-serif italic">
        "{data.profile.tagline}"
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <Button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
          View My Work <Icons.ChevronRight size={16} />
        </Button>
        <Button variant="secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          Contact Me
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600 border-t border-primary-100 pt-8 max-w-3xl mx-auto">
         <div className="flex items-center justify-center gap-2">
           <Icons.MapPin className="text-gold-600" size={16} /> {data.profile.location}
         </div>
         <div className="flex items-center justify-center gap-2">
           <Icons.Mail className="text-gold-600" size={16} /> {data.profile.email}
         </div>
         <div className="flex items-center justify-center gap-2">
           <Icons.Briefcase className="text-gold-600" size={16} /> {data.experience[0]?.company}
         </div>
      </div>
    </div>
  </section>
);

const ExperienceSection: React.FC<{ data: PortfolioData; onSelect: (id: string) => void }> = ({ data, onSelect }) => (
  <section id="experience" className="py-20 bg-white relative">
    <div className="container mx-auto px-4">
      <SectionTitle>Professional Experience</SectionTitle>
      <div className="max-w-4xl mx-auto space-y-8 relative">
        <div className="absolute left-4 md:left-1/2 h-full w-px bg-primary-200 transform -translate-x-1/2 hidden md:block"></div>
        
        {data.experience.map((exp, index) => (
          <div key={exp.id} className={`md:flex items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} group cursor-pointer`} onClick={() => onSelect(exp.id)}>
            <div className="hidden md:block w-5/12"></div>
            
            <div className="md:w-2/12 flex justify-center mb-4 md:mb-0 relative z-10">
              <div className="w-8 h-8 bg-primary-800 rounded-full border-4 border-gold-100 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                 <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
              </div>
            </div>
            
            <div className="md:w-5/12 bg-paper border border-primary-100 p-6 rounded-lg shadow-sm hover:shadow-lg hover:border-primary-300 transition-all relative">
               <div className="text-gold-600 text-xs font-bold uppercase tracking-widest mb-1">{exp.period}</div>
               <h3 className="text-xl font-serif font-bold text-slate-800">{exp.role}</h3>
               <div className="text-primary-800 font-medium mb-3">{exp.company}</div>
               <p className="text-slate-600 text-sm line-clamp-2">{exp.description}</p>
               <div className="mt-3 flex items-center text-xs font-bold text-primary-600 group-hover:translate-x-2 transition-transform">
                 Read More <Icons.ChevronRight size={12} className="ml-1" />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ProjectsSection: React.FC<{ data: PortfolioData; onSelect: (id: string) => void }> = ({ data, onSelect }) => (
  <section id="projects" className="py-20 bg-slate-50">
    <div className="container mx-auto px-4">
      <SectionTitle>Engineering Projects</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {data.projects.map((proj) => (
          <div key={proj.id} className="bg-white group border border-slate-200 hover:border-primary-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col overflow-hidden rounded-lg" onClick={() => onSelect(proj.id)}>
            <div className="h-56 bg-slate-200 relative overflow-hidden">
              {proj.media.length > 0 && proj.media[0].type === 'image' ? (
                <img src={proj.media[0].url} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-900 text-white relative">
                   <div className="absolute inset-0 bg-islamic-grid opacity-20"></div>
                   <Icons.Code size={48} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                 <span className="text-white font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                   View Details <Icons.ChevronRight size={16} />
                 </span>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2 group-hover:text-primary-800 transition-colors">{proj.title}</h3>
              <p className="text-primary-600 text-xs font-bold uppercase tracking-wider mb-4">{proj.tagline}</p>
              <p className="text-slate-600 mb-6 line-clamp-3 text-sm leading-relaxed">{proj.description}</p>
              <div className="mt-auto flex flex-wrap gap-2">
                {proj.technologies.slice(0, 4).map(tech => (
                  <span key={tech} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded border border-slate-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SkillsEducationSection: React.FC<{ data: PortfolioData }> = ({ data }) => (
  <section id="skills" className="py-20 bg-white">
    <div className="container mx-auto px-4">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
         
         {/* Education */}
         <div>
           <div className="flex items-center gap-3 mb-8">
             <Icons.Briefcase className="text-gold-600" size={24} />
             <h3 className="text-2xl font-display text-primary-900">Education</h3>
           </div>
           <div className="space-y-6">
             {data.education.map(edu => (
               <div key={edu.id} className="border-l-4 border-primary-800 pl-6 py-2">
                 <h4 className="text-xl font-bold text-slate-800">{edu.school}</h4>
                 <p className="text-primary-700 font-serif text-lg">{edu.degree}</p>
                 <div className="flex justify-between items-center mt-2 text-sm text-slate-500">
                    <span>{edu.period}</span>
                    {edu.gpa && <span className="font-bold text-primary-800">GPA: {edu.gpa}</span>}
                 </div>
                 {edu.description && <p className="text-slate-600 mt-2 text-sm">{edu.description}</p>}
               </div>
             ))}
           </div>
         </div>

         {/* Skills */}
         <div>
            <div className="flex items-center gap-3 mb-8">
             <Icons.Sparkles className="text-gold-600" size={24} />
             <h3 className="text-2xl font-display text-primary-900">Technical Arsenal</h3>
           </div>
           <div className="grid grid-cols-1 gap-6">
             {data.skills.map(cat => (
               <div key={cat.id}>
                 <h4 className="font-bold text-slate-700 mb-3 uppercase text-xs tracking-wider border-b border-slate-200 pb-1">{cat.category}</h4>
                 <div className="flex flex-wrap gap-2">
                   {cat.items.map(skill => (
                     <span key={skill} className="px-3 py-1.5 bg-primary-50 text-primary-900 text-sm border border-primary-100 rounded hover:bg-primary-100 transition-colors cursor-default">
                       {skill}
                     </span>
                   ))}
                 </div>
               </div>
             ))}
           </div>
         </div>

       </div>
    </div>
  </section>
);

const Footer: React.FC<{ data: PortfolioData }> = ({ data }) => (
  <footer id="contact" className="bg-primary-950 text-white py-16 border-t-8 border-gold-600 relative no-print">
    <div className="absolute inset-0 bg-islamic-grid opacity-5 pointer-events-none"></div>
    <div className="container mx-auto px-4 text-center relative z-10">
      <div className="mb-8">
        <Logo initials={data.profile.initials} />
      </div>
      <h2 className="text-3xl font-serif mb-6">Let's Build Something Extraordinary</h2>
      <p className="text-primary-200 max-w-2xl mx-auto mb-10 text-lg">
        Open for collaborations and new opportunities in Control Systems and AI.
      </p>
      
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        <a href={`mailto:${data.profile.email}`} className="flex items-center gap-2 px-6 py-3 bg-primary-900 rounded hover:bg-primary-800 border border-primary-700 transition-colors">
          <Icons.Mail size={18} className="text-gold-400" /> {data.profile.email}
        </a>
        {data.profile.linkedin && (
          <a href={data.profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-primary-900 rounded hover:bg-primary-800 border border-primary-700 transition-colors">
            <Icons.Linkedin size={18} className="text-gold-400" /> LinkedIn
          </a>
        )}
        {data.profile.phone && (
          <div className="flex items-center gap-2 px-6 py-3 bg-primary-900 rounded border border-primary-700 cursor-default">
             <Icons.Briefcase size={18} className="text-gold-400" /> {data.profile.phone}
          </div>
        )}
      </div>

      <div className="text-primary-400 text-sm font-light">
        &copy; {new Date().getFullYear()} {data.profile.fullName}. Designed with Islamic Modernism.
      </div>
    </div>
  </footer>
);

// --- Modals ---

const DetailModal: React.FC<{ 
  item: Experience | Project; 
  type: 'experience' | 'project'; 
  onClose: () => void 
}> = ({ item, type, onClose }) => {
  const isProject = type === 'project';
  const project = isProject ? (item as Project) : null;
  const experience = !isProject ? (item as Experience) : null;

  // Prevent scrolling background when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl relative flex flex-col animate-slide-up">
        
        {/* Header Image for Project */}
        {isProject && project?.media[0]?.type === 'image' && (
          <div className="h-48 md:h-64 bg-slate-200 relative flex-shrink-0">
             <img src={project.media[0].url} alt={project.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        )}

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full text-black md:text-white z-10 transition-colors border border-white/20"
        >
          <Icons.X size={24} className={isProject && project?.media[0] ? "md:text-white text-slate-800" : "text-slate-800"} />
        </button>

        <div className="p-8 md:p-12">
           {/* Content Header */}
           <div className="mb-8 border-b border-primary-100 pb-6">
             <div className="flex items-center gap-2 mb-2 text-gold-600 font-bold text-xs uppercase tracking-widest">
               {isProject ? 'Project Case Study' : 'Professional Experience'}
             </div>
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-2">
               {isProject ? project?.title : experience?.role}
             </h2>
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 text-primary-800 font-display text-lg">
                <span>{isProject ? project?.tagline : experience?.company}</span>
                {!isProject && <span className="text-sm bg-slate-100 px-2 py-1 rounded text-slate-600">{experience?.period}</span>}
             </div>
           </div>

           {/* Main Description */}
           <div className="prose prose-slate max-w-none mb-10">
             <p className="text-lg leading-relaxed text-slate-700">{item.description}</p>
           </div>

           {/* Experience Highlights */}
           {experience && (
             <div className="bg-primary-50 p-6 rounded-lg border border-primary-100 mb-8">
               <h3 className="text-lg font-bold text-primary-900 mb-4 flex items-center gap-2"><Icons.Sparkles size={18} /> Key Achievements</h3>
               <ul className="space-y-3">
                 {experience.highlights.map((h, i) => (
                   <li key={i} className="flex items-start gap-3">
                     <div className="mt-1.5 w-1.5 h-1.5 bg-gold-500 rotate-45 flex-shrink-0"></div>
                     <span className="text-slate-700">{h}</span>
                   </li>
                 ))}
               </ul>
             </div>
           )}

           {/* Project Tech & Media */}
           {project && (
             <>
                <div className="mb-10">
                   <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Technologies Used</h3>
                   <div className="flex flex-wrap gap-2">
                     {project.technologies.map(t => (
                       <span key={t} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded font-mono text-sm shadow-sm">
                         {t}
                       </span>
                     ))}
                   </div>
                </div>

                {/* Media Gallery */}
                {project.media.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-display text-primary-900 border-l-4 border-gold-500 pl-3">Gallery & Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.media.map((m, idx) => (
                        <div key={m.id} className="border border-slate-200 rounded overflow-hidden bg-slate-50">
                          {m.type === 'image' && (
                            <img src={m.url} alt={m.caption || 'Project Image'} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
                          )}
                          {m.type === 'video' && (
                            <div className="aspect-video bg-black flex items-center justify-center relative group">
                              <Icons.Play size={48} className="text-white opacity-70 group-hover:opacity-100 transition-opacity" />
                              <span className="absolute bottom-2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded">External Video</span>
                            </div>
                          )}
                          {m.type === 'pdf' && (
                            <div className="h-48 flex flex-col items-center justify-center bg-slate-100 text-slate-500 gap-2 hover:bg-slate-200 transition-colors cursor-pointer">
                              <Icons.FileText size={48} className="text-red-500" />
                              <span className="font-bold text-sm">Download PDF</span>
                            </div>
                          )}
                          {m.caption && <div className="p-3 text-sm text-slate-600 border-t border-slate-200 bg-white italic">{m.caption}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {project.link && (
                  <div className="mt-8 flex justify-center">
                    <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-primary-900 text-white px-8 py-3 rounded hover:bg-primary-800 transition-all shadow-lg hover:shadow-xl">
                      View Live Project <Icons.ExternalLink size={18} />
                    </a>
                  </div>
                )}
             </>
           )}
        </div>
      </div>
    </div>
  );
};

// --- Editor Components ---

const FieldGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="mb-4">
    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{label}</label>
    {children}
  </div>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props} className="w-full p-2 border border-slate-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none bg-slate-50 text-sm rounded-sm" />
);

const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { onImprove?: () => void, isThinking?: boolean }> = ({ onImprove, isThinking, ...props }) => (
  <div className="relative">
    <textarea {...props} className="w-full p-2 border border-slate-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none bg-slate-50 text-sm min-h-[100px] rounded-sm" />
    {onImprove && (
      <button 
        onClick={(e) => { e.preventDefault(); onImprove(); }} 
        disabled={isThinking}
        className="absolute bottom-2 right-2 p-1 text-primary-600 hover:bg-primary-50 rounded" 
        title="Improve with AI"
      >
        {isThinking ? <span className="animate-spin">⏳</span> : <Icons.Sparkles size={16} />}
      </button>
    )}
  </div>
);

const EditorPanel: React.FC<{
  data: PortfolioData;
  setData: (d: PortfolioData) => void;
  activeSection: SectionId;
  onClose: () => void;
}> = ({ data, setData, activeSection, onClose }) => {
  const [isThinking, setIsThinking] = useState(false);

  const handleImprove = async (text: string, path: string[]) => {
    if (!text) return;
    setIsThinking(true);
    const improved = await improveText(text, path.join(' '));
    setIsThinking(false);
    
    const newData = JSON.parse(JSON.stringify(data));
    let target = newData;
    for (let i = 0; i < path.length - 1; i++) {
      target = target[path[i]];
    }
    target[path[path.length - 1]] = improved;
    setData(newData);
  };

  const updateField = (path: string[], value: any) => {
    const newData = JSON.parse(JSON.stringify(data));
    let target = newData;
    for (let i = 0; i < path.length - 1; i++) {
      target = target[path[i]];
    }
    target[path[path.length - 1]] = value;
    setData(newData);
  };

  const renderContent = () => {
    if (activeSection === 'home') {
      return (
        <>
          <h3 className="font-bold text-primary-900 mb-4 border-b pb-2">Profile Details</h3>
          <FieldGroup label="Full Name"><Input value={data.profile.fullName} onChange={e => updateField(['profile', 'fullName'], e.target.value)} /></FieldGroup>
          <FieldGroup label="Title"><Input value={data.profile.title} onChange={e => updateField(['profile', 'title'], e.target.value)} /></FieldGroup>
          <FieldGroup label="Tagline"><TextArea value={data.profile.tagline} onChange={e => updateField(['profile', 'tagline'], e.target.value)} onImprove={() => handleImprove(data.profile.tagline, ['profile', 'tagline'])} isThinking={isThinking} /></FieldGroup>
          <FieldGroup label="About Bio"><TextArea value={data.profile.about} onChange={e => updateField(['profile', 'about'], e.target.value)} rows={6} onImprove={() => handleImprove(data.profile.about, ['profile', 'about'])} isThinking={isThinking} /></FieldGroup>
        </>
      );
    }
    if (activeSection === 'experience') {
       return (
         <>
            <h3 className="font-bold text-primary-900 mb-4 border-b pb-2">Experiences</h3>
            {data.experience.map((exp, idx) => (
              <div key={exp.id} className="mb-6 border-b border-slate-200 pb-6">
                 <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-slate-700">#{idx + 1}</span>
                    <button onClick={() => {
                        const newExps = [...data.experience];
                        newExps.splice(idx, 1);
                        setData({...data, experience: newExps});
                    }} className="text-red-500 hover:text-red-700"><Icons.Trash2 size={14} /></button>
                 </div>
                 <FieldGroup label="Role"><Input value={exp.role} onChange={e => updateField(['experience', idx.toString(), 'role'], e.target.value)} /></FieldGroup>
                 <FieldGroup label="Company"><Input value={exp.company} onChange={e => updateField(['experience', idx.toString(), 'company'], e.target.value)} /></FieldGroup>
                 <FieldGroup label="Period"><Input value={exp.period} onChange={e => updateField(['experience', idx.toString(), 'period'], e.target.value)} /></FieldGroup>
                 <FieldGroup label="Description"><TextArea value={exp.description} onChange={e => updateField(['experience', idx.toString(), 'description'], e.target.value)} onImprove={() => handleImprove(exp.description, ['experience', idx.toString(), 'description'])} isThinking={isThinking} /></FieldGroup>
              </div>
            ))}
            <Button onClick={() => setData({...data, experience: [{id: generateId(), role: 'New Role', company: 'Company', period: '2025', location: 'City', description: '...', highlights: []}, ...data.experience]})} className="w-full"><Icons.Plus size={16}/> Add Experience</Button>
         </>
       )
    }
    if (activeSection === 'projects') {
        return (
          <>
            <h3 className="font-bold text-primary-900 mb-4 border-b pb-2">Projects</h3>
            {data.projects.map((proj, idx) => (
              <div key={proj.id} className="mb-8 border-b border-slate-200 pb-6">
                 <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-slate-700">{proj.title}</span>
                    <button onClick={() => {
                        const newProjs = [...data.projects];
                        newProjs.splice(idx, 1);
                        setData({...data, projects: newProjs});
                    }} className="text-red-500 hover:text-red-700"><Icons.Trash2 size={14} /></button>
                 </div>
                 <FieldGroup label="Title"><Input value={proj.title} onChange={e => updateField(['projects', idx.toString(), 'title'], e.target.value)} /></FieldGroup>
                 <FieldGroup label="Tagline"><Input value={proj.tagline} onChange={e => updateField(['projects', idx.toString(), 'tagline'], e.target.value)} /></FieldGroup>
                 <FieldGroup label="Description"><TextArea value={proj.description} onChange={e => updateField(['projects', idx.toString(), 'description'], e.target.value)} onImprove={() => handleImprove(proj.description, ['projects', idx.toString(), 'description'])} isThinking={isThinking} /></FieldGroup>
                 
                 {/* Media Editor Sub-section */}
                 <div className="bg-slate-100 p-3 rounded mb-3">
                    <label className="text-xs font-bold uppercase text-slate-500 mb-2 block">Media Items</label>
                    {proj.media.map((m, mIdx) => (
                        <div key={m.id} className="flex gap-2 mb-2">
                             <Input value={m.url} placeholder="Image URL" onChange={(e) => {
                                 const newMedia = [...proj.media];
                                 newMedia[mIdx].url = e.target.value;
                                 updateField(['projects', idx.toString(), 'media'], newMedia);
                             }} />
                             <button onClick={() => {
                                 const newMedia = [...proj.media];
                                 newMedia.splice(mIdx, 1);
                                 updateField(['projects', idx.toString(), 'media'], newMedia);
                             }} className="text-red-500"><Icons.X size={14}/></button>
                        </div>
                    ))}
                    <Button variant="secondary" className="text-xs py-1 w-full" onClick={() => {
                        const newMedia = [...proj.media, { id: generateId(), type: 'image', url: '', caption: '' }];
                        updateField(['projects', idx.toString(), 'media'], newMedia);
                    }}>Add Media URL</Button>
                 </div>
              </div>
            ))}
             <Button onClick={() => setData({...data, projects: [{id: generateId(), title: 'New Project', tagline: 'Tagline', description: '...', technologies: [], media: []}, ...data.projects]})} className="w-full"><Icons.Plus size={16}/> Add Project</Button>
          </>
        )
    }
    return <div className="text-center text-slate-500 p-4">Select Home, Experience, or Projects to edit.</div>
  };

  return (
    <div className="fixed bottom-0 right-0 w-full md:w-96 h-[60vh] md:h-[calc(100vh-70px)] bg-white shadow-2xl border-l border-primary-200 flex flex-col z-50 animate-slide-in-right">
      <div className="flex items-center justify-between p-4 bg-primary-900 text-white">
        <div className="flex items-center gap-2">
          <Icons.Settings size={18} />
          <span className="font-bold tracking-wide">CMS PANEL</span>
        </div>
        <button onClick={onClose} className="hover:bg-primary-800 p-1 rounded"><Icons.X size={20} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {renderContent()}
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);
  const [nav, setNav] = useState<NavigationState>({ activeSection: 'home' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loaded = getPortfolioData();
    // Merge loaded data with INITIAL_DATA to ensure new fields (education/skills) exist if local storage is old
    setData({...INITIAL_DATA, ...loaded});
  }, []);

  useEffect(() => {
    savePortfolioData(data);
  }, [data]);

  const handleLogin = () => {
    const pwd = prompt("Enter Admin Password (default: admin):");
    if (pwd === 'admin') {
      setIsAdmin(true);
      setShowEditor(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleScroll = (id: SectionId) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setNav(prev => ({ ...prev, activeSection: id }));
      setMenuOpen(false);
    }
  };

  const openModal = (type: 'experience' | 'project', id: string) => {
    setNav(prev => ({ ...prev, modalItem: { type, id } }));
  };

  const closeModal = () => {
    setNav(prev => ({ ...prev, modalItem: undefined }));
  };

  // PDF Generation Hack: Add specific class to body then print
  const handleDownloadPDF = () => {
    const originalTitle = document.title;
    document.title = `${data.profile.fullName}_CV.pdf`;
    window.print();
    document.title = originalTitle;
  };

  const currentModalItem = nav.modalItem 
    ? (nav.modalItem.type === 'experience' 
        ? data.experience.find(e => e.id === nav.modalItem?.id) 
        : data.projects.find(p => p.id === nav.modalItem?.id))
    : null;

  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-slate-50 selection:bg-gold-200 selection:text-primary-900">
      
      {/* Navbar */}
      <nav className="bg-primary-900 text-white shadow-lg sticky top-0 z-40 no-print border-b-4 border-gold-600 backdrop-blur-md bg-opacity-95">
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
           <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleScroll('home')}>
             <Logo initials={data.profile.initials} />
             <div className="flex flex-col">
                <span className="font-display font-bold text-lg md:text-xl tracking-widest leading-none">{data.profile.fullName.toUpperCase()}</span>
                <span className="text-[10px] text-gold-400 uppercase tracking-[0.2em] hidden md:block">{data.profile.title}</span>
             </div>
           </div>

           {/* Desktop Nav */}
           <div className="hidden md:flex items-center gap-8">
             {['home', 'experience', 'projects', 'skills'].map((item) => (
               <button 
                 key={item}
                 onClick={() => handleScroll(item as SectionId)} 
                 className="text-xs font-bold tracking-widest hover:text-gold-400 transition-colors uppercase relative group"
               >
                 {item}
                 <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gold-500 transition-all group-hover:w-full"></span>
               </button>
             ))}
             <Button onClick={handleDownloadPDF} variant="secondary" className="ml-4 text-xs py-2 px-4 bg-gold-600 text-white border-none hover:bg-gold-500 shadow-gold-glow">
                <Icons.Download size={14} /> Resume
             </Button>
           </div>

           {/* Mobile Menu Toggle */}
           <button className="md:hidden p-2 text-gold-400" onClick={() => setMenuOpen(!menuOpen)}>
             {menuOpen ? <Icons.X /> : <Icons.Menu />}
           </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-primary-900 z-30 flex flex-col items-center justify-center space-y-8 text-white md:hidden animate-fade-in no-print">
             {['home', 'experience', 'projects', 'skills'].map((item) => (
               <button key={item} onClick={() => handleScroll(item as SectionId)} className="text-2xl font-display uppercase">{item}</button>
             ))}
             <button onClick={handleDownloadPDF} className="flex items-center gap-2 text-gold-400 text-xl"><Icons.Download /> Download PDF</button>
        </div>
      )}

      {/* Main Single Page Content */}
      <main className="flex-grow relative">
        <HomeSection data={data} />
        <ExperienceSection data={data} onSelect={(id) => openModal('experience', id)} />
        <ProjectsSection data={data} onSelect={(id) => openModal('project', id)} />
        <SkillsEducationSection data={data} />
      </main>

      {/* Footer */}
      <Footer data={data} />
      
      {/* Admin Lock */}
      <div className="fixed bottom-4 right-4 z-50 no-print opacity-50 hover:opacity-100 transition-opacity">
         {!isAdmin ? (
            <button onClick={(e) => { if(e.ctrlKey) handleLogin(); else handleLogin(); }} className="bg-primary-100 text-primary-900 p-2 rounded-full shadow-lg hover:bg-gold-400" title="Admin Access">
               <Icons.Lock size={16} />
            </button>
         ) : (
            <div className="flex flex-col gap-2 items-end">
               <button onClick={() => setShowEditor(!showEditor)} className="bg-primary-800 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 font-bold text-xs uppercase">
                  <Icons.Edit size={14} /> {showEditor ? 'Close Editor' : 'Edit Site'}
               </button>
               <button onClick={() => setIsAdmin(false)} className="bg-red-600 text-white p-2 rounded-full shadow-lg" title="Logout">
                  <Icons.LogOut size={14} />
               </button>
            </div>
         )}
      </div>

      {/* Modals & Panels */}
      {nav.modalItem && currentModalItem && (
        <DetailModal 
          item={currentModalItem} 
          type={nav.modalItem.type} 
          onClose={closeModal} 
        />
      )}

      {isAdmin && showEditor && (
        <EditorPanel 
          data={data} 
          setData={setData} 
          activeSection={nav.activeSection} 
          onClose={() => setShowEditor(false)}
        />
      )}
    </div>
  );
};

export default App;
