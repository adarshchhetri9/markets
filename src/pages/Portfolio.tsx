import { useEffect, useState } from "react";
import axios from "axios";
import { bitcoin } from "../assets";
import { Link } from "react-router-dom";

interface UserDetails {
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
  };
  email: string;
  phone: string;
  location: {
    city: string;
    country: string;
  };
}

export default function Portfolio(): JSX.Element {
  const [details, setDetails] = useState<UserDetails>({
    name: { first: "", last: "" },
    picture: { large: "" },
    email: "",
    phone: "",
    location: { city: "", country: "" },
  });

  const fetchDetails = async () => {
    try {
      const { data } = await axios.get("https://randomuser.me/api/");
      const userDetails: UserDetails = data.results[0];
      setDetails(userDetails);
      // console.log(userDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="w-[390px]  ">
      <h1 className="text-6xl bg-black text-white text-center p-6 mb-16 rounded-t-lg m-2">
        Protfolio
      </h1>
      {Object.keys(details).length > 0 && (
        <div className="flex flex-col  gap-2">
          <img
            src={details.picture?.large}
            className="rounded-full mx-auto"
            alt="User"
          />
          <p className="text-center text-2xl font-bold">
            Name: <span>{`${details.name?.first} ${details.name?.last}`}</span>
          </p>
          <div>
            <p className="text-center text-lg">
              Email: <span>{details.email}</span>
            </p>
            <p className="text-center text-lg">
              Phone: <span>{details.phone}</span>
            </p>
            <p className="text-center text-lg">
              Location:{" "}
              <span>
                {" "}
                {`${details.location.city}, ${details.location.country}`}
              </span>
            </p>
          </div>
        </div>
      )}
      <div className="pb-20">
        <Link to={"/"}>
          <h1 className="bg-black text-white  mx-5 px-6 py-4 rounded-lg mt-16 text-center">
            Check Your Wallets
          </h1>
        </Link>

        <Link to="/bitcoin">
          <img src={bitcoin} className="w-36 h-36 mx-auto mt-16" alt="" />
        </Link>
      </div>
    </div>
  );
}
