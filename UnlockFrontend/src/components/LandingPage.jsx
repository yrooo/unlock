import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import Button from './ui/Button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNavigate, Link } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-bold">
      {/* Navbar */}
      <nav className="w-full fixed top-0 flex justify-between items-center px-8 py-4 bg-white border-b-4 border-black shadow-neo">
        <Link to="/" className="text-3xl">
          🔓 Unlock
        </Link>
        {!isConnected && (
          <ConnectButton
            showBalance={false}
            chainStatus="none"
            accountStatus="address"
          />
        )}
      </nav>

      {/* Hero Section */}
      <section className="text-center mt-16">
        <h1 className="text-6xl font-bold mb-4">
          Tokenize your <span>Content</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Unlock premium content using blockchain.
        </p>
        <div className="flex items-center justify-center">
          {!isConnected ? (
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <Button
                  className="flex justify-center"
                  onClick={openConnectModal}
                >
                  Get Started
                </Button>
              )}
            </ConnectButton.Custom>
          ) : (
            <Button
              className="flex justify-center"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;