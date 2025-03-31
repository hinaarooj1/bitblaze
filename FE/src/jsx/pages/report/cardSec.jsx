
import './CryptoCard.css';
import UsdtLogo from '../../../assets/images/usdt.png';
import React, { useState, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthUser } from 'react-auth-kit';
import { createUserTransactionApi, getCoinsUserApi, getsignUserApi, getUserCoinApi } from '../../../Api/Service';
const CryptoCard = () => {

    const [activeDurationBtc, setActiveDurationBtc] = useState(30);
    const [activeDurationEth, setActiveDurationEth] = useState(30);
    const [activeDurationUsdt, setActiveDurationUsdt] = useState(30);
    const [isLoading, setisLoading] = useState(true);
    const [isDisable, setisDisable] = useState(false);
    const [isCardDetails, setisCardDetails] = useState(false);
    const [liveBtc, setliveBtc] = useState(null);
    const [UserTransactions, setUserTransactions] = useState([]);

    const [btcBalance, setbtcBalance] = useState(0);
    const [UserData, setUserData] = useState(true);
    const [fractionBalance, setfractionBalance] = useState("00");
    const [ethBalance, setethBalance] = useState(0);
    const [usdtBalance, setusdtBalance] = useState(0);

    const activeBtc = (duration) => {
        setActiveDurationBtc(duration);
    };
    const activeEth = (duration) => {
        setActiveDurationEth(duration);
    };
    const activeUsdt = (duration) => {
        setActiveDurationUsdt(duration);
    };

    const getCoins = async (data) => {
        let id = data._id;
        try {
            // const response = await axios.get(
            //     "https://api.coindesk.com/v1/bpi/currentprice.json"
            // );
            const userCoins = await getCoinsUserApi(id);

            if (userCoins.success) {
                setUserData(userCoins.getCoin);
                // setUserTransactions;
                let val = 0;
                if (userCoins && userCoins.btcPrice && userCoins.btcPrice.quote && userCoins.btcPrice.quote.USD) {

                    val = userCoins.btcPrice.quote.USD.price
                } else {
                    val = 96075.25
                }
                console.log("val: ", val);
                setliveBtc(val);
                console.log("userCoins.success: ", userCoins.success);
                // setisLoading(false);
                // tx
                const btc = userCoins.getCoin.transactions.filter((transaction) =>
                    transaction.trxName.includes("bitcoin")
                );
                const btccomplete = btc.filter((transaction) =>
                    transaction.status.includes("completed")
                );
                let btcCount = 0;
                let btcValueAdded = 0;
                for (let i = 0; i < btccomplete.length; i++) {
                    const element = btccomplete[i];
                    btcCount = element.amount;
                    btcValueAdded += btcCount;
                }
                setbtcBalance(btcValueAdded);
                console.log("btcValueAdded: ", btcValueAdded);
                // tx
                // tx
                const eth = userCoins.getCoin.transactions.filter((transaction) =>
                    transaction.trxName.includes("ethereum")
                );
                const ethcomplete = eth.filter((transaction) =>
                    transaction.status.includes("completed")
                );
                let ethCount = 0;
                let ethValueAdded = 0;
                for (let i = 0; i < ethcomplete.length; i++) {
                    const element = ethcomplete[i];
                    ethCount = element.amount;
                    ethValueAdded += ethCount;
                }
                setethBalance(ethValueAdded);
                console.log("ethValueAdded: ", ethValueAdded);
                // tx
                // tx
                const usdt = userCoins.getCoin.transactions.filter((transaction) =>
                    transaction.trxName.includes("tether")
                );
                const usdtcomplete = usdt.filter((transaction) =>
                    transaction.status.includes("completed")
                );
                let usdtCount = 0;
                let usdtValueAdded = 0;
                for (let i = 0; i < usdtcomplete.length; i++) {
                    const element = usdtcomplete[i];
                    usdtCount = element.amount;
                    usdtValueAdded += usdtCount;
                }
                setusdtBalance(usdtValueAdded);
                // tx

                const totalValue = (
                    btcValueAdded * liveBtc +
                    ethValueAdded * 2640 +
                    usdtValueAdded
                ).toFixed(2);

                //
                const [integerPart, fractionalPart] = totalValue.split(".");

                const formattedTotalValue = parseFloat(integerPart).toLocaleString(
                    "en-US",
                    {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                    }
                );

                //
                setfractionBalance(fractionalPart);
                return;
            } else {
                toast.dismiss();
                toast.error(userCoins.msg);
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error);
        } finally {
        }
    };
    const [Active, setActive] = useState(false);
    const [stakingModal, setstakingModal] = useState(false);
    let toggleBar = () => {
        if (Active === true) {
            setActive(false);
        } else {
            setActive(true);
        }
    };
    const [currentCrypto, setCurrentCrypto] = useState(null);
    let toggleStaking = (cryptoType) => {
        if (stakingModal === true) {
            setstakingModal(false);

            setCurrentCrypto(null);
            setAmount("");
        } else {
            setstakingModal(true);

            setCurrentCrypto(cryptoType);
        }
    };

    const authUser = useAuthUser();
    const Navigate = useNavigate();
    const [isUser, setIsUser] = useState({});
    const getsignUser = async () => {
        setisLoading(true)
        try {
            const formData = new FormData();
            formData.append("id", authUser().user._id);
            console.log("authUser().user: ", authUser().user);
            const userCoins = await getsignUserApi(formData);
            console.log('userCoins: ', userCoins);

            if (userCoins.success) {
                setIsUser(userCoins.signleUser);

                return;
            } else {
                toast.dismiss();
                toast.error(userCoins.msg);
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error);
        } finally {
            setisLoading(false)
        }
    };
    //

    useEffect(() => {
        getCoins(authUser().user);
        getsignUser();
        if (authUser().user.role === "user") {
            return;
        } else if (authUser().user.role === "admin") {
            Navigate("/admin/dashboard");
            return;
        }
    }, []);
    // withdraw
    const handleAmountChange = (e, cryptoName) => {
        const value = e.target.value;

        console.log("e: ", cryptoName);

        // Allow empty value (when all digits are removed)
        if (value === "") {
            setAmount("");
            return;
        }

        // Parse the value to a number
        const numericValue = parseFloat(value);
        if (cryptoName === "bitcoin") {
            if (!isNaN(numericValue)) {
                // If value exceeds btcBalance, set it to btcBalance
                if (numericValue > btcBalance) {
                    setAmount(btcBalance.toString());
                } else {
                    setAmount(value);
                }
            }
            return;
        }
        if (cryptoName === "ethereum") {
            if (!isNaN(numericValue)) {
                // If value exceeds btcBalance, set it to btcBalance
                if (numericValue > ethBalance) {
                    setAmount(ethBalance.toString());
                } else {
                    setAmount(value);
                }
            }
            return;
        }
        if (cryptoName === "tether") {
            if (!isNaN(numericValue)) {
                // If value exceeds btcBalance, set it to btcBalance
                if (numericValue > usdtBalance) {
                    setAmount(usdtBalance.toString());
                } else {
                    setAmount(value);
                }
            }
            return;
        }
        // Check if the value is a valid number
    };
    const [amount, setAmount] = useState("");
    const [parseAmountBtc, setparseAmountBtc] = useState(0);
    const [parsrIntBtc, setparsrIntBtc] = useState(0);
    const [estInterest, setEstInterest] = useState(0);
    useEffect(() => {
        calculateEstInterest();
    }, [amount, activeDurationBtc]);

    const calculateEstInterest = () => {
        let rate;
        switch (activeDurationBtc) {
            case 30:
                rate = 11;
                break;
            case 60:
                rate = 45;
                break;
            case 90:
                rate = 123;
                break;
            default:
                rate = 0;
        }
        const validAmount = parseFloat(amount) || 0;
        const interest = (validAmount * rate) / 100;
        const total = validAmount + interest;
        setEstInterest(interest);
        setparseAmountBtc(parseFloat(validAmount));
        setparsrIntBtc(parseFloat(interest));
    };
    const [parseAmountEth, setparseAmountEth] = useState(0);
    const [parsrIntEth, setparsrIntEth] = useState(0);
    const [estInterestEth, setEstInterestEth] = useState(0);
    useEffect(() => {
        calculateEstInterestEth();
    }, [amount, activeDurationEth]);

    const calculateEstInterestEth = () => {
        let rate;
        switch (activeDurationEth) {
            case 30:
                rate = 11;
                break;
            case 60:
                rate = 45;
                break;
            case 90:
                rate = 123;
                break;
            default:
                rate = 0;
        }
        const validAmount = parseFloat(amount) || 0;
        const interest = (validAmount * rate) / 100;
        const total = validAmount + interest;
        setEstInterestEth(interest);
        setparseAmountEth(parseFloat(validAmount));
        setparsrIntEth(parseFloat(interest));
    };
    const [parseAmountUsdt, setparseAmountUsdt] = useState(0);
    const [parsrIntUsdt, setparsrIntUsdt] = useState(0);
    const [estInterestUsdt, setEstInterestUsdt] = useState(0);
    useEffect(() => {
        calculateEstInterestUsdt();
    }, [amount, activeDurationUsdt]);

    const calculateEstInterestUsdt = () => {
        let rate;
        switch (activeDurationUsdt) {
            case 30:
                rate = 11;
                break;
            case 60:
                rate = 45;
                break;
            case 90:
                rate = 123;
                break;
            default:
                rate = 0;
        }
        const validAmount = parseFloat(amount) || 0;
        const interest = (validAmount * rate) / 100;
        const total = validAmount + interest;
        setEstInterestUsdt(interest);
        setparseAmountUsdt(parseFloat(validAmount));
        setparsrIntUsdt(parseFloat(interest));
    };
    const confirmTransaction = async (depositName) => {
        let e = "crypto";
        if (amount.trim() === "") {
            toast.error("Amount cannot be empty");
            return false;
        }

        // Parse the input to a floating-point number
        const parsedAmount = parseFloat(amount);

        // Check if the parsed amount is not a number
        if (isNaN(parsedAmount)) {
            toast.error("Invalid amount");
            return false;
        }

        // Check if the amount is zero
        if (parsedAmount === 0) {
            toast.error("Amount cannot be zero");
            return false;
        }

        // Check if the amount is negative
        if (parsedAmount < 0) {
            toast.error("Amount cannot be negative");
            return false;
        }

        try {
            setisDisable(true);
            let body;
            if (e == "crypto") {
                body = {
                    trxName: depositName,
                    amount: -parsedAmount,
                    txId: "staking amount",
                    e: e,
                    status: "completed",
                };
                if (!body.trxName || !body.amount || !body.txId) {
                    console.log("body.amount: ", body.amount);
                    console.log("body.trxName: ", body.trxName);
                    toast.dismiss();
                    toast.error("Fill all the required fields");
                    return;
                }
            }

            let id = authUser().user._id;
            console.log("e: ", e);

            const newTransaction = await createUserTransactionApi(id, body);

            if (newTransaction.success) {
                toast.dismiss();
                toast.success("Staking completed successfully");

                setstakingModal(false);

                getCoins(authUser().user);
                setCurrentCrypto(null);
                setAmount("");
            } else {
                toast.dismiss();
                toast.error(newTransaction.msg);
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error);
        } finally {
            setisDisable(false);
            getTransactions()
        }
    };
    const getTransactions = async () => {
        try {
            // const response = await axios.get(
            //     "https://api.coindesk.com/v1/bpi/currentprice.json"
            // );
            const allTransactions = await getUserCoinApi(authUser().user._id);
            if (allTransactions.success) {
                console.log('allTransactions: ', allTransactions);
                setUserTransactions(allTransactions.getCoin.transactions.reverse());

                return;
            } else {
                toast.dismiss();
                toast.error(allTransactions.msg);
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error);
        } finally {
            // setisLoading(false);
        }
    };
    useEffect(() => {
        getTransactions()

    }, []);
    //
    const cardData = {
        cardHolder: 'John Doe',
        cardNumber: '5366 1900 1913 5678',
        expiry: '03/26',
        cvv: '123',
        balance: '1,250 USDT',
        logo: UsdtLogo
    };

    return (
        <>
            {isLoading ?

                <div className="crypto-card skeleton">
                    <div className="crypto-card-header">
                        <div className="skeleton-box logo"></div> {/* Logo Placeholder */}
                        <span className="skeleton-box small crypto-balance"> </span>
                    </div>
                    <div className="crypto-card-body">
                        <div className="skeleton-box text"></div> {/* Apply Now Placeholder */}
                        <div className="crypto-card-footer">
                            <div className="skeleton-box small"></div> {/* Card Holder Placeholder */}
                            <div className="skeleton-box small"></div> {/* Expiry Placeholder */}
                        </div>
                    </div>
                </div>
                : !isUser.cryptoCard?.status || isUser.cryptoCard?.status === "inactive" ?
                    <div className="crypto-card">
                        <div className="crypto-card-header">
                            <img src={cardData.logo} alt="USDT Logo" className="crypto-logo" />
                            <span className="crypto-balance">  ******</span>
                        </div>
                        <div className="crypto-card-body">
                            <p className="crypto-card-number">Apply Now</p>
                            <div className="crypto-card-footer"  >
                                <span className="crypto-card-holder">**** **** </span>
                                <span className="crypto-card-expiry">EXP: **/**</span>
                            </div>
                        </div>
                    </div>

                    : isUser.cryptoCard?.status === "applied" ? <div className="crypto-card">
                        <div className="crypto-card-header">
                            <img src={cardData.logo} alt="USDT Logo" className="crypto-logo" />
                            <span className="crypto-balance">  ******</span>
                        </div>
                        <div className="crypto-card-body">
                            <p className="crypto-card-number">Applied</p>
                            <div className="crypto-card-footer"  >
                                <span className="crypto-card-holder">**** **** </span>
                                <span className="crypto-card-expiry">EXP: **/**</span>
                            </div>
                        </div>
                    </div> : isUser.cryptoCard?.status === "active" ?

                        <>
                            <div className="crypto-card">
                                <div className="crypto-card-header">
                                    <img src={cardData.logo} alt="USDT Logo" className="crypto-logo" />
                                    <span className="crypto-balance">{cardData.balance}</span>
                                </div>
                                <div className="crypto-card-body">
                                    <p className="crypto-card-number">
                                        {isCardDetails ? cardData.cardNumber : "•••• •••• •••• ••••"}
                                    </p>
                                    <div className="crypto-card-footer">
                                        <span className="crypto-card-holder">
                                            {isCardDetails ? cardData.cardHolder : "•••• ••••"}
                                        </span>
                                        <span className="crypto-card-expiry">
                                            EXP: {isCardDetails ? cardData.expiry : "**/**"}
                                        </span>
                                    </div>
                                    <div className="crypto-card-footer-2">
                                        <span className="crypto-card-holder">
                                            CVV: {isCardDetails ? cardData.cvv : "***"}
                                        </span>
                                    </div>

                                </div>
                            </div>
                            <div className="rev-btn">
                                <button className="reveal-button"

                                    onClick={() => setisCardDetails(!isCardDetails)}
                                >
                                    {isCardDetails ? "Hide Details" : "Show Details"}
                                </button>
                            </div>
                        </> : ""

            }

        </>
    );
};

export default CryptoCard;