import {
  FaInstagramSquare,
  FaTelegram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

const SocialNetworks = () => {
  return (
    <div className="mt-3 text-center " style={{ fontSize: "25px" }}>
      <a
        className="social-networks"
        href="https://www.instagram.com/this.majid"
      >
        <FaInstagramSquare className="text-secondary" />
      </a>
      <a className="social-networks" href="http://t.me/thismajid">
        <FaTelegram className="text-secondary ms-2" />
      </a>
      <a className="social-networks" href="https://github.com/thismajid">
        <FaGithub className="text-secondary ms-2" />
      </a>
      <a
        className="social-networks"
        href="https://www.linkedin.com/in/thismajid"
      >
        <FaLinkedin className="text-secondary ms-2" />
      </a>
    </div>
  );
};

export default SocialNetworks;
