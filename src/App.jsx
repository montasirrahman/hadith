import { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";

function App() {
  // const fetchData = async () => {
  //   try {
  //     const data = await axios.get(
  //       "https://random-hadith-generator.vercel.app/bukhari"
  //     );
  //     console.log(data);
  //     setHadis(data.data.data.hadith_english);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     console.log("Async Completed");
  //   }
  //};

  //   const [hadis, setHadis] = useState("");
  //   const fetchData = () => {
  //     const data = axios.get(
  //       "https://random-hadith-generator.vercel.app/bukhari"
  //     );
  //     data
  //       .then((res) => {
  //         console.log(res.data);
  //         setHadis(res.data.data.hadith_english);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   return (
  //     <>
  //       <center className="hadis">
  //         <i>{hadis}</i>
  //       </center>
  //       <br></br>
  //       <center>
  //         <button onClick={fetchData}>Get Hadis</button>
  //       </center>
  //       <br></br>
  //     </>
  //   );
  // }

  //   const [hadis, setHadis] = useState("");
  //   const [hadisHistory, setHadisHistory] = useState([]);

  //   const fetchData = () => {
  //     axios
  //       .get("https://random-hadith-generator.vercel.app/bukhari")
  //       .then((res) => {
  //         const newHadis = res.data.data.hadith_english;
  //         setHadis(newHadis);

  //         setHadisHistory((prevHistory) => [...prevHistory, newHadis]);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //   useEffect(() => {
  //     fetchData(); // Fetch data when the component mounts
  //   }, []);

  //   return (
  //     <>
  //       <center>
  //         {hadisHistory.map((item, index) => (
  //           <p className="hadis" key={index}>
  //             {item}
  //           </p>
  //         ))}
  //       </center>
  //       <br></br>
  //       <center>
  //         <button onClick={fetchData}>New Hadis</button>
  //       </center>
  //       <br></br>
  //     </>
  //   );
  // }

  const [hadis, setHadis] = useState("");
  const [hadisHistory, setHadisHistory] = useState([]);
  const hadisContainerRef = useRef(null);
  const buttonRef = useRef(null);

  const fetchData = () => {
    axios
      .get("https://random-hadith-generator.vercel.app/bukhari")
      .then((res) => {
        const newHadis = res.data.data.hadith_english;
        setHadis(newHadis);

        setHadisHistory((prevHistory) => [...prevHistory, newHadis]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (hadisContainerRef.current) {
      hadisContainerRef.current.scrollTop =
        hadisContainerRef.current.scrollHeight;
    }
  }, [hadisHistory]);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [hadis]);

  return (
    <div>
      <center>
        <div className="hadis-container" ref={hadisContainerRef}>
          {hadisHistory.map((item, index) => (
            <p className="hadis" key={index}>
              <i>{item}</i>
            </p>
          ))}
        </div>
      </center>
      <br></br>
      <center>
        <button onClick={fetchData} ref={buttonRef}>
          New Hadis
        </button>
      </center>
      <br></br>
    </div>
  );
}
export default App;
