
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the splash screen
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Redirecting to PayGrow...</h1>
        <div className="mt-4 w-8 h-8 rounded-full border-4 border-paygrow-blue border-t-transparent animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default Index;
