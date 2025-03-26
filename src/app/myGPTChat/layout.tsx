import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface ChildrenProps extends LayoutProps {
  className?: string;
  params?: {
    id: string;
  };
}

const ProjectsLayout = ({ params, children }: ChildrenProps) => {
  const id = params?.id;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50 h-16 flex items-center justify-center">
        <div className="text-lg font-semibold"> 智能小客服 {id}</div>
      </header>

      {/* Spacer for Header */}
      <div className="h-16" />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto px-4 pb-20">{children}</main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-white shadow z-50 h-16 flex items-center justify-center">
        <div className="text-sm text-gray-600">© 2025 My App</div>
      </footer>
    </div>
  );
};

export default ProjectsLayout;
