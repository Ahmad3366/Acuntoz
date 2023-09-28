import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmailVerfiy = () => {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();

  useEffect(() => {
    const verifiyEmailUrl = async () => {

        // console.log(param.id, param.token);
        const url = `${import.meta.env.VITE_API_URI}/user/${param.id}/verify/${param.token}`;
        const res = await fetch(url);
        const json = await res.json()

        if (res.ok) {
            console.log(json);
            setValidUrl(true);
        }
        if (!res.ok) {
            console.log(json);
            setValidUrl(false);
        }
      
    };
    verifiyEmailUrl();
  }, []);

  return (
    <div>
      {validUrl ? (
        <div>
          <h2>Email Verified successfully</h2>
        </div>
      ) : (
        <h1>404 not found</h1>
      )}
    </div>
  );
};

export default EmailVerfiy;
