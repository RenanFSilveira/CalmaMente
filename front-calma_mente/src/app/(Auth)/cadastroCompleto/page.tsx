import ProgressTimeline from '@/components/ProgressBar';
import { TimelineStep } from '@/components/ProgressBar';

export default function HomePage() {
  // Dados de exemplo para a timeline
  const mySteps: TimelineStep[] = [
    {
      title: 'Create account',
      description: 'Vitae sed mi luctus laoreet.',
      status: 'completed',
    },
    {
      title: 'Profile information',
      description: 'Cursus semper viverra facilisis et et some more.',
      status: 'current',
    },
    {
      title: 'Business information',
      description: 'Penatibus eu quis ante.',
      status: 'upcoming',
    },
    {
      title: 'Theme',
      description: 'Faucibus nec nec enim leo et.',
      status: 'upcoming',
    },
    {
      title: 'Preview',
      description: 'Iusto et officia maiores porro ad non quas.',
      status: 'upcoming',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-slate-800 p-8 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-8 text-center">
          Setup Workflow
        </h1>
        <ProgressTimeline steps={mySteps} />
      </div>
    </div>
  );
}