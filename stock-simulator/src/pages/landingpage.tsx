import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container">
      <div className="text-center navigation-box">
        <Link
          to="/login"
          className={`flex items-center px-4 py-2.5 rounded transition duration-200 hover:bg-gray-200`}
        >
          <FontAwesomeIcon icon={faSignInAlt} className="h-5 w-5 mr-2" />
          Login
        </Link>
        <Link
          to="/signup"
          className={`flex items-center px-4 py-2.5 rounded transition duration-200 hover:bg-gray-200`}
        >
          <FontAwesomeIcon icon={faUserPlus} className="h-5 w-5 mr-2" />
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
