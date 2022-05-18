import './App.css';
import { useEffect, useState } from 'react';

const TEST_GIFS = [
    'https://i.ibb.co/yS6hXxN/meme1.jpg',
    'https://i.ibb.co/VHtJ2j1/meme6.jpg',
    'https://i.ibb.co/RTYjrxY/Studio-Project.jpg',
    'https://i.ibb.co/ZGnZ9hF/x.jpg',
    'https://i.ibb.co/31ckmGb/y.jpg',
    'https://i.ibb.co/DMZnddC/z.jpg',
    'https://i.ibb.co/ZGnZ9hF/x.jpg',
    'https://i.ibb.co/31ckmGb/y.jpg',
    'https://i.ibb.co/DMZnddC/z.jpg'
]

function App() {

    let [wallet, setWallet] = useState(null);
    let [formInputValue, setFormInputValue] = useState('');
    let [imageList, setImageList] = useState([]);

    useEffect(() => {
        async function walletCheck() {
            await isWalletConnected();
        }

        setImageList(TEST_GIFS);
        window.addEventListener('load', walletCheck);
        return () => window.removeEventListener('load', walletCheck);
    }, []);
    
    async function isWalletConnected() {
        try {
            let { solana } = window;
            if (solana.isPhantom) {
                console.log('Phantom Wallet found! 💰');

                // Connect to Phantom Wallet extension, onlyIfTrusted -> if previously connected, no need for new popup
                let connect = await solana.connect({ onlyIfTrusted: true });
                setWallet(connect.publicKey.toString());
                console.log('Connected with Public Key: ', connect.publicKey.toString());
            }
            else alert('No Phantom Wallet found! Get it and come back.'); 
        } catch (error) {
            console.log('error:', error);
        }
    }

    async function connectWallet() {
        // Equivalent to let solana = window.solana;
        let { solana } = window;
        let connect = await solana.connect();
        setWallet(connect.publicKey.toString());
    }

    function updateFormInputValue(event) {
        setFormInputValue(event.target.value);
    }

    async function uploadImageLink() {
        if(formInputValue.length > 0) {
            let regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
            let checkInput = regex.test(formInputValue);

            if(checkInput) {
            } else {
                alert('Please enter a valid image url.');
            }
            
        } else {
            alert('Empty input.');
        }
    }

    return (
        <div className="App">
            <div className="authed-container">
                <div className="header-container">
                    <p className="header">🔥 FIIT Memes 🔥</p>
                    <p className="sub-text"> The spiciest memes from FIIT STU 🌶 on the Solana blockchain ⛓ </p>
                    {wallet == null &&
                        <button className="cta-button connect-wallet-button" onClick={connectWallet}>Connect your Phantom Wallet</button>
                    }
                    
                    <div className="connected-container">
                        {wallet != null &&
                            <form onSubmit={(e) => {e.preventDefault(); uploadImageLink()}}>
                                <input type="text" placeholder="Enter image link!" value={formInputValue} onChange={updateFormInputValue}/>
                                <input type="submit" className="cta-button submit-gif-button" value="Submit" />
                            </form>
                        }

                        <div className="gif-grid">
                        {imageList.map(image => (
                            <div className="gif-item" key={image}>
                            <img src={image} alt={image} />
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                <div className="footer-container">

                </div>
            </div>
        </div>
    );
};

export default App;
