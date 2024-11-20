import { FaWallet, FaPenToSquare, FaArrowRightToBracket, FaArrowRightFromBracket, FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import CardPopupForm from "./CardPopupForm";
import { useEffect, useState } from "react";
import axios from "axios";

const OverviewCards =  () => {
  const [isOpen, setIsOpen] = useState(false);
  const [PopupFormTitle, setPopupFormTitle] = useState("Balance");

  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/transactions");
      console.log("Fetched Transactions:", response.data);
      setTransactions(response.data); // Storing data in the state
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();  
  }, [])
  

  const togglePopup = () => setIsOpen(!isOpen);
  const updatePopupFormTitle = (TheDesiredTitle) => setPopupFormTitle(TheDesiredTitle);

  const cards = [
    {
      icon: <FaWallet />,
      title: "Balance",
      amount: transactions.filter((t) => t.category === "Balance")
                          .reduce((sum, t) => sum+t.amount, 0),
      percentage: "+12%",
      trendIcon: <FaArrowTrendUp />,
      bgColor: "bg-blue-200",
      secondaryBgColor: "bg-blue-100",
    },
    {
      icon: <FaArrowRightToBracket />,
      title: "Income",
      amount: transactions.filter((t) => t.category === "Income")
                          .reduce((sum, t) => sum+t.amount, 0),
      percentage: "+4%",
      trendIcon: <FaArrowTrendUp />,
      bgColor: "bg-purple-200",
      secondaryBgColor: "bg-purple-100",
    },
    {
      icon: <FaArrowRightFromBracket />,
      title: "Expenses",
      amount: transactions.filter((t) => t.category === "Expenses")
                          .reduce((sum, t) => sum+t.amount, 0),
      percentage: "-2%",
      trendIcon: <FaArrowTrendDown />,
      bgColor: "bg-green-200",
      secondaryBgColor: "bg-green-100",
    },
  ];

  return (
    <div className="flex-1 mt-4 p-1">
      <h1 className="font-bold text-lg mb-2">Overview</h1>
      
      {isOpen && <CardPopupForm isOpen={isOpen} togglePopup={togglePopup} PopupFormTitle={PopupFormTitle} />}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mr-4">
        {cards.map((card, index) => (
          <article key={index} className="flex flex-col border rounded-lg text-black shadow-md relative overflow-hidden">
            <div className={`flex-1 ${card.bgColor} w-full p-3 rounded-tr-lg rounded-tl-lg`}>
              <div className="flex justify-between items-center mb-6">
                {card.icon}
                <span className="font-semibold text-xl">{card.title}</span>
                <button onClick={() => { togglePopup(); updatePopupFormTitle(card.title); }} className="text-gray-500">
                  <FaPenToSquare />
                </button>
              </div>
            </div>
            <div className={`flex-2 ${card.secondaryBgColor} w-full p-3 rounded-br-lg rounded-bl-lg`}>
              <div className="text-3xl font-bold mb-2">{card.amount}</div>
              <div className={`text-${card.percentage.startsWith('-') ? 'red' : 'green'}-500 text-sm flex items-center gap-1`}>
                {card.percentage} {card.trendIcon}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default OverviewCards;
