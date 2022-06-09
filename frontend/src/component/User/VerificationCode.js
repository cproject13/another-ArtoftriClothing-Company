import axios from 'axios';
import { useEffect,useState } from 'react';
import { useParams,useHistory } from 'react-router-dom';
import '../User/VerificationCode.css';
import { useAlert } from 'react-alert';

const VerificationCode = () => {

  const { id } = useParams();
  const alert = useAlert();
  const history = useHistory();

  const [code,setCode] = useState('');
  const [userCode,setUserCode] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();

    const fetchUser = async () => {
      try {
        const data = await axios.get(`/api/v1/users`,{ signal:abortCont.signal });
        const users = data.data.filter(user => user._id === id).map(user => user.code);
        setUserCode(users[0]);
      }
      catch(err) {
        console.log(err);
      }
    }
    fetchUser();
    return () => abortCont.abort();
  },[id]);

  const verifyUser = async () => {
    if(code !== userCode) {
      alert.error('Code does not match, please check again');
    } else {
      alert.success('User has been verified');
      history.push('/login');
    }
  }

  return (
    <div className="verification-container">
      <div className="code-container">
        <span>Verification Code</span>
        <input onKeyPress={(e) => e.key === "Enter" && verifyUser()} value={code} onChange={(e) => setCode(e.target.value)} type="text" placeholder="Enter code" />
      </div>
    </div>
  )
}

export default VerificationCode