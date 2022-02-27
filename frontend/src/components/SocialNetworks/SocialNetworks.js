import {
  FaInstagramSquare,
  FaTelegram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import "./socialnetworks.css";

const SocialNetworks = () => {
  return (
    <div className="mt-3 text-center" style={{ fontSize: "25px" }}>
      <a href="https://www.instagram.com/this.majid">
        <FaInstagramSquare className="text-secondary social-networks" />
      </a>
      <a href="http://t.me/thismajid">
        <FaTelegram className="text-secondary ms-2 social-networks" />
      </a>
      <a href="https://github.com/thismajid">
        <FaGithub className="text-secondary ms-2 social-networks" />
      </a>
      <a href="https://www.linkedin.com/in/thismajid">
        <FaLinkedin className="text-secondary ms-2 social-networks" />
      </a>
    </div>
  );
};

export default SocialNetworks;
