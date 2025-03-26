import React from 'react';
import './CryptoCard.css';

const CryptoCard = () => {
    const cardData = {
        cardHolder: 'John Doe',
        cardNumber: '**** **** **** 1234',
        expiry: '12/27',
        balance: '5.432 BTC',
        logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'
    };

    return (
        <div className="crypto-card">
            <div className="crypto-card-header">
                <img src={cardData.logo} alt="Crypto Logo" className="crypto-logo" />
                <span className="crypto-balance">{cardData.balance}</span>
            </div>
            <div className="crypto-card-body">
                <p className="crypto-card-number">{cardData.cardNumber}</p>
                <div className="crypto-card-footer">
                    <span className="crypto-card-holder">{cardData.cardHolder}</span>
                    <span className="crypto-card-expiry">EXP: {cardData.expiry}</span>
                </div>
            </div>
        </div>
    );
};

export default CryptoCard;