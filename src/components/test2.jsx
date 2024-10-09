import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState, useAppDispatch, useAppSelector } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import IconPencilPaper from '../components/Icon/IconPencilPaper';
import { getUserDetails, upgradeUser } from '../store/userSlice';
import WalletConnectButton from '../components/Button';
import { COMPANY_WALLET, URL, USDT_ADDRESS } from '../Constants';
import TimerComponent from '../components/Timer';
import { getTotalAmounts, verifyUser, verifyUserForAdmin } from '../store/adminSlice';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Marquee from 'react-fast-marquee';
import { useWeb3ModalState } from '@web3modal/ethers/react';
import { ERC20_ABI } from '../ERC20_ABI';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider, Contract, ethers, formatUnits, parseUnits } from 'ethers'
import Modal from 'react-modal';
import '../assets/css/modal.css';
import IconX from '../components/Icon/IconX';
import IconCreditCard from '../components/Icon/IconCreditCard';

const Finance = () => {
    const MySwal = withReactContent(Swal);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isLoadingButton, SetIsLoadingButton] = useState(false);
    const [rejoinMessage, setRejoinMessage] = useState(0);
    const [transactionID, setTransactionID] = useState('');
    const [refresh, setRefresh] = useState('');
    const [errorhandle, setErrorHandle] = useState('');
    const currentDateTime = new Date();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const { data: userInfo } = useAppSelector((state: any) => state.getUserDetailsReducer);
    const { data: updatedUser } = useAppSelector((state: any) => state.verifyUserForAdminReducer);


    const { loading: joiningLoading, data: joiningData, error: joiningError } = useAppSelector((state: any) => state.sendJoiningRequestReducer);

    const { data: upgradeInfo, error: upgradeError } = useAppSelector((state: any) => state.upgradeUserReducer);

    

    const { data: totalAmountInfo } = useAppSelector((state: any) => state.getTotalAmountsReducer);

    let url2 = '0xFD539e080e7024b07166595c3D5022EbAF46927E';
    useEffect(() => {
        if (upgradeInfo) {
            setRejoinMessage(1);
            window.location.reload();
        } else if (upgradeError) {
            setRejoinMessage(2);
        }
    }, [upgradeInfo, upgradeError]);

    const { address, chainId, isConnected } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const { open, selectedNetworkId } = useWeb3ModalState();

    // const sendUSDT = async () => {
    //     SetIsLoadingButton(true)
    //     try {
    //         if (!isConnected) throw new Error('Wallet is not connected');
    //         if (!walletProvider) throw new Error('Signer failed!');

    //         const ethersProvider = new BrowserProvider(walletProvider);
    //         const signer = await ethersProvider.getSigner();
    //         const owner = await signer.getAddress();
    // console.log("owner id",owner);

    //         const contract = new Contract(USDT_ADDRESS, ERC20_ABI, signer);
    //         const amount = parseUnits('50.01', 18);

    //         // Get the wallet balance
    //         const balance = await contract.balanceOf(owner);

    //         // Check if the balance is less than the transfer amount
    //         if (balance<amount) {
    //             throw new Error('Insufficient balance');
    //         }

    //         const txn = await contract.transfer(COMPANY_WALLET, amount);
    //         const receipt = await txn.wait();

    //         console.log(receipt.hash, 'status'); // Transaction Hash
    //         if (receipt.status === 1) {
    //             dispatch(verifyUserForAdmin(userInfo?._id));
    //         }
    //     } catch (e) {
    //         // Handle error here
    //         console.log(e);
    //         throw new Error('You rejected your transaction');
    //     }
    //     finally{
    //         if (userInfo && userInfo.userStatus === true) {
    //             SetIsLoadingButton(false);
    //           }
    //     }
    // };

    
    
    const showMessage = () => {
        MySwal.fire({
            title: `Amount Transaction is Successfull`,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 5000,
            showCloseButton: true,
        });
    };

    // const sendUSDT = async () => {
    //     SetIsLoadingButton(true);
    //     try {
    //         if (!isConnected) throw new Error('Wallet is not connected');
    //         if (!walletProvider) throw new Error('Signer failed!');

    //         const ethersProvider = new BrowserProvider(walletProvider);
    //         const signer = await ethersProvider.getSigner();
    //         const owner = await signer.getAddress();
    // console.log("owner id",owner);

    //         const contract = new Contract(USDT_ADDRESS, ERC20_ABI, signer);
    //         const amount = parseUnits('50.01', 18);

    //         // Get the wallet    
    //         const balance = await contract.balanceOf(owner);

    //         // Check if the balance is less than the transfer amount
    //         if (balance<amount) {
    //             throw new Error('Insufficient balance');
    //         }

    //         const txn = await contract.transfer(COMPANY_WALLET, amount);
    //         const receipt = await txn.wait();

    //         console.log(receipt.hash, 'status'); // Transaction Hash
    //         if (receipt.status === 1) {
    //            await dispatch(verifyUserForAdmin(userInfo?._id));
    //         }
    //         console.log("send USDT response", updatedUser);   
    //     } catch (e) {
    //         console.log(e);
    //         throw new Error('You rejected your transaction');
    //      } 
    //     //finally {
    //     //     SetIsLoadingButton(false);
    //     //     if (updatedUser && updatedUser.updatedUser.userStatus === true) {
    //     //         showMessage();
    //     //     }
    //     // }
    // };

    // useEffect(() => {
    //     if (updatedUser && updatedUser.updatedUser.userStatus === true) {
    //         showMessage();
    //         window.location.reload();
    //         SetIsLoadingButton(false);
    //     }
    // }, [updatedUser]);

    const sendUSDT = async () => {
        SetIsLoadingButton(true);
        try {
            const fakeStatus = 1;
            // const hash="ARFAKH1234"
            if (fakeStatus === 1) {
                dispatch(verifyUserForAdmin(userInfo?._id));
                // dispatch(saveUserHash(userInfo?._id,hash));
                showMessage();
            }
        } catch (e) {
            // Handle error here
            console.log(e);
            throw new Error('You rejected your transaction');
        }
    };
    
    useEffect(() => {
        
        if (updatedUser.data && updatedUser.data.userStatus === true) {
            showMessage();
            window.location.reload();
        }
    }, [updatedUser]);




    // TODO
    // The value data have something to do in ui
    // Which i didn't consider
    const data = null;

    let url = '';
    if (userInfo) {
        url = `https://wealthaai.com/signup/${userInfo._id}`;
    }

    const handleClick = () => {
        const url = `https://ecard.wealthaai.com/admin/login/Q9424TX8068ED08WQH22FI448`;
        window.location.href = url;
    };
    const handleClickUser = () => {
        const url = `https://ecard.wealthaai.com/member/login/Q9424TX8068ED08WQH22FI448/${userInfo?._id}`;
        window.location.href = url;
    };

    const showMessage2 = () => {
        MySwal.fire({
            title: `User Transaction Id Added Successfull`,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 5000,
            showCloseButton: true,
        });
    };

    const errorMessage = () => {
        MySwal.fire({
            title: 'Failed',
            toast: false,
            position: 'top-right',
            showConfirmButton: false,
            timer: 5000,
            showCloseButton: true,
        });
    };

    const verifyToApply = async () => {
        try {
            setRefresh('');
            if (!transactionID) {
                setErrorHandle('Please provide a Transaction ID');
                return;
            }

            const token: any = localStorage.getItem('userInfo');
            const parsedData = JSON.parse(token);

            const config = {
                headers: {
                    Authorization: `Bearer ${parsedData.access_token}`,
                    'content-type': 'application/json',
                },
            };

            const response = await axios.post(`${URL}/api/users/apply-for-verify`, { transactionID }, config);
            console.log(response, 'responsesdsdsdsd');

            if (response.status === 200) {
                console.log('Payment verification successful!');
                setTransactionID('');
                showMessage2();
                setRefresh('start');
            } else {
                errorMessage();
                console.error('Payment verification failed:', response.data.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error verifying payment:', error);
        }
    };

    useEffect(() => {
        dispatch(setPageTitle('Dashboard'));
        dispatch(getUserDetails());
        dispatch(getTotalAmounts());
    }, [dispatch, refresh]);

    //bitcoinoption
    // const bitcoin: any = {
    //     series: [
    //         {
    //             data: [21, 9, 36, 12, 44, 25, 59, 41, 25, 66],
    //         },
    //     ],
    //     options: {
    //         chart: {
    //             height: 45,
    //             type: 'line',
    //             sparkline: {
    //                 enabled: true,
    //             },
    //         },
    //         stroke: {
    //             width: 2,
    //         },
    //         markers: {
    //             size: 0,
    //         },
    //         colors: ['#00ab55'],
    //         grid: {
    //             padding: {
    //                 top: 0,
    //                 bottom: 0,
    //                 left: 0,
    //             },
    //         },
    //         tooltip: {
    //             x: {
    //                 show: false,
    //             },
    //             y: {
    //                 title: {
    //                     formatter: () => {
    //                         return '';
    //                     },
    //                 },
    //             },
    //         },
    //         responsive: [
    //             {
    //                 breakPoint: 576,
    //                 options: {
    //                     chart: {
    //                         height: 95,
    //                     },
    //                     grid: {
    //                         padding: {
    //                             top: 45,
    //                             bottom: 0,
    //                             left: 0,
    //                         },
    //                     },
    //                 },
    //             },
    //         ],
    //     },
    // };

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    useEffect(() => {
        if (data) {
            dispatch(verifyUser());
        }
    }, [data]);


    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         const currentHour = currentDateTime.getHours();
    //         const currentMinute = currentDateTime.getMinutes();
    //         setShowButton(currentHour === 17 || (currentHour > 17 && currentHour < 21));
    //     }, 1000);

    //     return () => clearInterval(intervalId);
    // }, []);

    const upgradeHandler = () => {
        const confirmed = window.confirm('Are you sure you want to upgrade your plan?');
        if (confirmed) {
            dispatch(upgradeUser());
        }
    };

    const showMessage3 = () => {
        MySwal.fire({
            title: `Wallet withdrawal successfull`,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 5000,
            showCloseButton: true,
        });
    };

    const errorMessage3 = () => {
        MySwal.fire({
            title: ' Withdrawal Failed',
            toast: false,
            position: 'top-right',
            showConfirmButton: false,
            timer: 5000,
            showCloseButton: true,
        });
    };

    /// withdraw wallet amount
    const handleWithrawAmount = async () => {
        try {
            SetIsLoadingButton(true);

            if (amount > userInfo?.earning) {
                setMessage(`Entered amount $${amount} is greater than your wallet amount $${userInfo?.earning}`);
                return;
            }
            const token: any = localStorage.getItem('userInfo');
            const parsedData = JSON.parse(token);

            const config = {
                headers: {
                    Authorization: `Bearer ${parsedData.access_token}`,
                    'content-type': 'application/json',
                },
            };

            const response = await axios.post(`${URL}/api/admin/manage-payment-send`, { amount }, config);

            if (response.status === 200) {
                showMessage3();
                setAmount('');
                closeModal();
                SetIsLoadingButton(false);
                dispatch(getUserDetails());
            } else {
                errorMessage3();
                setAmount('');
                closeModal();
                SetIsLoadingButton(false);
            }
        } catch (error) {
            console.error('Failed', error);
        } finally {
        
            SetIsLoadingButton(false);
        }
    };

    //Rebirth Status False

    const rebirthStatusChanger = async () => {
        try {
            const token: any = localStorage.getItem('userInfo');
            const parsedData = JSON.parse(token);
      
          const config = {
            headers: {
              Authorization: `Bearer ${parsedData.access_token}`,
              'Content-Type': 'application/json',
            },
          };
      
          const response = await axios.post(`${URL}/api/admin/generate-rebirth`, {}, config);
          console.log(response, "res rebirthh ");
      
        } catch (error) {
          console.error('Error changing rebirth status:', error);
        }
      };

    useEffect(() => {
        dispatch(upgradeUser());
        if(userInfo?.rebirthStatus){
            rebirthStatusChanger();
        }
    }, [dispatch,userInfo]);

    return (
        <div>
            {/* <div className="panel"  style={{margin:'20px'}}>
                    <div className="flex items-center justify-between mb-5 ">
    <div className="flex items-center">
        <h5 className="font-semibold text-lg dark:text-white-light">Profile</h5>
        <Link to="/users/user-account-settings" className="ml-3 p-2 rounded-full bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 text-white">
            <IconPencilPaper  />
        </Link>
    </div>
    <div className="flex items-center">
        <WalletConnectButton />
        {address && userInfo && userInfo.userStatus == false && (
            <button type="button" onClick={async () => await approvalWrite()} className="btn btn-outline-success ml-3">
                Activate account
            </button>
        )}
    </div>
</div>

                        <div className="flex flex-col justify-center">
                            <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-6">
                                <img className="w-[80px] h-[80px] sm:w-[150px] sm:h-[150px] rounded-full object-cover" src="/assets/images/user-silhouette.png" alt="" />
                                <div>
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-primary text-xl">{userInfo && userInfo.name}</p>
                                    </div>
                                    <ul className="mt-5 flex flex-col max-w-[170px] m-auto space-y-4 font-semibold text-white-dark">
                                        <li className="flex items-center gap-2">User ID: {userInfo && userInfo.ownSponserId}</li>
                                        <li className="flex items-center gap-2">
                                            Rank:{' '}
                                            {userInfo && userInfo.currentPlan == 'beginner'
                                                    ? `Beginner`
                                                    : userInfo && userInfo.currentPlan == 'bronze'
                                                    ? 'Bronze'
                                                    : userInfo && userInfo.currentPlan == 'silver'
                                                    ? 'Silver'
                                                    : userInfo && userInfo.currentPlan == 'gold'
                                                    ? 'Gold'
                                                    : userInfo && userInfo.currentPlan == 'platinum'
                                                    ? 'Platinum'
                                                    : userInfo && userInfo.currentPlan == 'diamond'
                                                    ? 'Diamond'
                                                    : userInfo && userInfo.currentPlan == 'star'
                                                    ? 'Star'
                                                    : 'Beginner'}
                                        </li>
                                        <li>
                                            Account Status:{' '}
                                            {userInfo && userInfo.userStatus === true ? <span className="text-green-600 text-sm">Activated</span> : <span className="text-red-700">Pending</span>}
                                        </li>
                                        <li>
                                            Auto Pool:{' '}
                                            {userInfo && userInfo.autoPool == false ? <span className="text-red-700">Not Activated</span> : <span className="text-green-600">Activated</span>}
                                        </li>
                                       
                                    </ul>
                                    <div className="text-center mt-5">
                                        {userInfo && userInfo.joiningRequest && userInfo.joiningRequest.status == false && <>You are successfully sent your join request. You will be verified soon.</>}
                                        {userInfo && userInfo.joiningRequest && userInfo.joiningRequest.status == true && <>You are verified.</>}
                                    </div>
                                </div>
                            </div>
                            <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                                <div className="flex justify-between">
                                    <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-white">Referral Link</div>
                                </div>
                                <div className="flex items-center my-5">
                                    <input type="text" defaultValue={url} className="form-input" />
                                    <div className="referralBtn sm:flex sm:space-y-0 sm:space-x-2 rtl:space-x-reverse">
                                        <CopyToClipboard
                                            text={url}
                                            onCopy={(text, result) => {
                                                if (result) {
                                                    alert('Referral link copied successfully!');
                                                }
                                            }}
                                        >
                                            <button type="button" className="btn rounded-lg p-2 ms-2 text-white">
                                                Copy
                                            </button>
                                        </CopyToClipboard>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div> */}
            <div className="relative block overflow-hidden bg-[#DDE4EB] py-2 mb-6 w-full cursor-pointer">
                <Marquee className=" text-primary text-[16px] font-semibold w-full h-full">
                    <span className="inline min-w-full h-full text-center whitespace-nowrap ">
                        <span style={{ color: 'red' }}> Beta version:</span> If you see any error please contact us at support@wealthaai.in&nbsp;&nbsp;&nbsp;
                    </span>
                </Marquee>
            </div>

            <div className="panel" style={{ margin: '20px' }}>
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center">
                        {/* <h5 className="font-semibold text-lg dark:text-white-light">Profile</h5> */}
                        <Link to="/users/user-account-settings" className="ml-3 p-2 rounded-full bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 text-white">
                            <IconPencilPaper />
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <WalletConnectButton />
                        {address && userInfo && userInfo.userStatus == false && (
                            <button type="button" onClick={sendUSDT} className="btn btn-outline-success ml-3" disabled={isLoadingButton}>
                                {isLoadingButton ? 'Loading...' : 'Transfer $31'}
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-6">
                        <img className="w-[80px] h-[80px] sm:w-[150px] sm:h-[150px] rounded-full object-cover" src="/assets/images/user-silhouette.png" alt="" />
                        <div>
                            <div className="flex flex-col">
                                <p className="font-semibold text-primary text-xl">{userInfo && userInfo.name}</p>
                            </div>
                            <ul className="mt-5 flex flex-col max-w-[170px] m-auto space-y-4 font-semibold text-white-dark">
                                <li className="flex items-center gap-2">User ID: {userInfo && userInfo.ownSponserId}</li>
                                <li className="flex items-center gap-2">
                                    Rank:{' '}
                                    {userInfo && userInfo.currentPlan == 'promoter'
                                        ? `Promoter`
                                        : userInfo && userInfo.currentPlan == 'royalAchiever'
                                        ? 'Royal Achiever'
                                        : userInfo && userInfo.currentPlan == 'crownAchiever'
                                        ? 'Crown Achiever'
                                        : userInfo && userInfo.currentPlan == 'diamondAchiever'
                                        ? 'Diamond Achiever'
                                        : 'Promoter'}
                                </li>
                                <li>
                                    Account Status:{' '}
                                    {userInfo && userInfo.userStatus === true ? <span className="text-green-600 text-sm">Activated</span> : <span className="text-red-700">Pending</span>}
                                </li>
                                <li>Auto Pool: {userInfo && userInfo.autoPool == false ? <span className="text-red-700">Not Activated</span> : <span className="text-green-600">Activated</span>}</li>
                            </ul>
                            <div className="text-center mt-5">
                                {userInfo && userInfo.joiningRequest && userInfo.joiningRequest.status == false && <>You are successfully sent your join request. You will be verified soon.</>}
                                {userInfo && userInfo.joiningRequest && userInfo.joiningRequest.status == true && <>You are verified.</>}
                            </div>
                        </div>
                    </div>
                    {userInfo && userInfo.userStatus && (
                        <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                            <div className="flex justify-between">
                                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-white">Referral Link</div>
                            </div>
                            <div className="flex items-center my-5">
                                <input type="text" defaultValue={url} className="form-input" />
                                <div className="referralBtn sm:flex sm:space-y-0 sm:space-x-2 rtl:space-x-reverse">
                                    <CopyToClipboard
                                        text={url}
                                        onCopy={(text, result) => {
                                            if (result) {
                                                alert('Referral link copied successfully!');
                                            }
                                        }}
                                    >
                                        <button type="button" className="btn rounded-lg p-2 ms-2 text-white">
                                            Copy
                                        </button>
                                    </CopyToClipboard>
                                </div>
                            </div>
                        </div>
                    )}

                    {userInfo && userInfo.isAdmin && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                                <div className="flex justify-between">
                                    <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-white">Total Earning</div>
                                </div>
                                <div className="flex flex-col justify-center mt-5">
                                    <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-white">${totalAmountInfo && totalAmountInfo?.earningSum}</div>
                                </div>
                            </div>
                            <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                                <div className="flex justify-between">
                                    <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-white">Total Autopool</div>
                                </div>
                                <div className="flex flex-col justify-center mt-5">
                                    <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-white">${totalAmountInfo && totalAmountInfo?.totalAutoPoolBank}</div>
                                </div>
                            </div>
                            <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                                <div className="flex justify-between">
                                    <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-white">Total Company Profit</div>
                                </div>
                                <div className="flex flex-col justify-center mt-5">
                                    <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-white">${userInfo && userInfo?.companyProfit}</div>
                                </div>
                            </div>
                            <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                                <div className="flex justify-between">
                                    <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-white">Total Withdrawal</div>
                                </div>
                                <div className="flex flex-col justify-center mt-5">
                                    <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-white">${totalAmountInfo && totalAmountInfo?.savingSum}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* <div className="panel" style={{ margin: '20px' }}>
                <div className="flex flex-col sm:flex-row items-center my-5">
                    <img
                        className="w-full sm:w-[150px] h-auto object-cover rounded-lg mr-5"
                        src="/assets/images/OR.jpg"
                        alt="Scan QR & Add Fund"
                    />
                    <div className="mt-4 sm:mt-0">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-white">Scan QR & Add Fund</div>
                        </div>
                        <p className="text-white-dark text-sm sm:text-xs">After payment please verify...</p>
                    </div>
                </div>
                {userInfo?.verifyStatus === 'inactive' && (
                    <div className="text-yellow-500 mb-2 " style={{ margin: '10px' }}>
                        Verify Status: Pending
                    </div>
                )}
                {userInfo?.verifyStatus === 'pending' && (
                    <div className="text-yellow-500 mb-2" style={{ margin: '10px' }}>
                        Verify Status: Inactive
                    </div>
                )}
                {userInfo?.verifyStatus === 'active' && (
                    <div className="text-green-500 mb-2" style={{ margin: '10px' }}>
                        Verify Status: Active
                    </div>
                )}
                <div className="flex items-center">
                    {userInfo?.verifyStatus !== 'active' ? (
                        <>
                            <input
                                type="text"
                                className="form-input mr-3"
                                placeholder="Enter Transaction Id"
                                value={transactionID}
                                onChange={(e) => {
                                    setTransactionID(e.target.value);
                                    setErrorHandle('');
                                }}
                            />
                            <button type="button" className="btn rounded-lg p-2 text-white" onClick={verifyToApply}>
                                Verify
                            </button>
                        </>
                    ) : (
                        <span className="text-green-500"></span>
                    )}
                </div>
                {errorhandle && <div className="text-red-600 mt-2">{errorhandle}</div>}
                <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 " style={{ margin: '30px' }}>
                    <div className="flex justify-between"></div>
                    <div className="flex items-center my-5">
                        <input type="text" defaultValue={url2} className="form-input" />
                        <div className="referralBtn sm:flex sm:space-y-0 sm:space-x-2 rtl:space-x-reverse">
                            <CopyToClipboard
                                text={url2}
                                onCopy={(text, result) => {
                                    if (result) {
                                        alert('Code copied successfully!');
                                    }
                                }}
                            >
                                <button type="button" className="btn rounded-lg p-2 ms-2 text-white">
                                    Copy
                                </button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="pt-5">
                <div className="flex flex-wrap">
                    <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 m-2 flex-1">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-white ">Wallet Amount</div>
                        </div>
                        <div className="flex flex-col justify-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-white">${userInfo && userInfo?.earning.toFixed(2)}</div>
                        </div>
                     
                    </div>

                    <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 m-2 flex-1">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-white">Rejoining Wallet Amount</div>
                        </div>
                        <div className="flex items-center justify-between mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-white">${userInfo && userInfo?.joiningAmount}</div>
                            {/* <button type="button" onClick={upgradeHandler} className="btn rounded-lg p-2 mt-4 text-white">
                                Rejoin
                            </button> */}
                        </div>
                        {/* {rejoinMessage === 1 && <div className="mt-2 text-white">You are successfully upgraded.</div>}
                        {rejoinMessage === 2 && <div className="mt-2  text-white ">You are not eligible for upgrade as of now</div>} */}
                    </div>
                    <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 m-2 flex-1">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-white">Rebirth Wallet Amount</div>
                        </div>
                        <div className="flex items-center justify-between mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-white">${userInfo && userInfo?.rebirthAmount}</div>
                            {/* <button type="button" onClick={upgradeHandler} className="btn rounded-lg p-2 mt-4 text-white">
                                Rejoin
                            </button> */}
                        </div>
                        {/* {rejoinMessage === 1 && <div className="mt-2 text-white">You are successfully upgraded.</div>}
                        {rejoinMessage === 2 && <div className="mt-2  text-white ">You are not eligible for upgrade as of now</div>} */}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ margin: '10px' }}>
                    {/* Total income generated */}
                    <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-white">Total Amount</div>
                        </div>
                        <div className="flex flex-col justify-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-white">${userInfo && userInfo?.overallIncome}</div>
                        </div>
                    </div>

                    {/* Wallet amount and withdrawal */}

                    {/*  Time On-Site */}

                    <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-white">Total Direct Referrals</div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-white"> {userInfo && userInfo.children.length} </div>
                            {/* <div className="badge bg-white/30">- 2.35% </div> */}
                        </div>
                    </div>
                    <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-white">Level Income</div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-white">$ {userInfo && userInfo?.levelIncome} </div>
                            {/* <div className="badge bg-white/30">- 2.35% </div> */}
                        </div>
                    </div>

                    {/* Generation income (Level income) */}
                    {/* <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                            <div className="flex justify-between">
                                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Generation Income</div>
                            </div>
                            <div className="flex flex-col justify-center mt-5">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">${userInfo && userInfo.generationIncome.toFixed(2)}</div>
                            </div>
                        </div> */}

                    {/* Sponsorship income (Direct refferal income) */}
                    <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-white">Sponsorship Income</div>
                        </div>
                        <div className="flex flex-col justify-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-white">${userInfo && userInfo?.sponsorshipIncome}</div>
                        </div>
                    </div>

                    {/* Global autopool income */}
                    <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-white">Global Autopool Income</div>
                        </div>
                        <div className="flex flex-col justify-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-white">${userInfo && userInfo?.autoPoolAmount}</div>
                        </div>
                    </div>

                    {/* Wallet Amount */}
                    <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-white">Total Withdrawal</div>
                        </div>
                        <div className="flex flex-col justify-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-white">${userInfo && userInfo?.withdrawAmount}</div>
                        </div>
                    </div>
                    {/* Savings account */}
                    <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-white">Total Savings</div>
                        </div>
                        <div className="flex flex-col justify-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-white">${userInfo && userInfo?.savingsIncome}</div>
                        </div>
                    </div>

                    {/* Total direct refferals */}
                    {/* {(userInfo?.isLeader || userInfo?.isPromoter) && (
                        <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                            <div className="flex justify-between">
                                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold text-white">Leader wallet</div>
                            </div>
                            <div className="flex items-center mt-5">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-white"> {userInfo && userInfo.leaderIncome} </div>
                                <div className="badge bg-white/30">- 2.35% </div>
                            </div>
                        </div>
                    )} */}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 text-white" style={{ marginTop: '10px' }}></div>

                {/* <div className="mb-5 flex items-center">
                    <div className="w-full shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] panel p-0 dark:shadow-none">
                        <div className="px-5 py-5 flex justify-evenly items-center flex-col sm:flex-row">
                            <div className="ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left">
                                <p className="mb-2 text-white-dark text-lg mt-5">Download Plan PDF from below</p>
                                <p className="font-semibold text-white-dark mt-4 sm:mt-8">
                                    <button type="button" className="rounded-lg py-2 px-5 bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800  text-white">
                                        Download Now
                                    </button>
                                </p>
                            </div>

                            <div className="overflow-hidden">
                                <img src="/assets/images/pdf-icon.png" alt="profile" className="w-16 mt-5 object-cover" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-5 flex items-center">
                    <div className="w-full shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] panel p-0 dark:shadow-none">
                        <div className="px-5 py-5 flex justify-evenly items-center flex-col sm:flex-row">
                            <div className="ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left">
                                <h5 className="text-[#3b3f5c] text-[22px] md:text-[48px] font-semibold mb-2 dark:text-white-light">Trade Now!!!</h5>
                                <p className="mb-2 text-white-dark text-lg mt-5">Trading account will open shortly</p>
                            </div>

                            <div className="overflow-hidden">
                                <img src="/assets/images/trade.png" alt="profile" className="w-60 mt-5 object-cover" />
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="mb-5 flex items-center">
                    <div className="w-full shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] panel p-0 dark:shadow-none">
                        <div className="px-5 pt-5 flex justify-evenly items-center flex-col sm:flex-row">
                            <div className="ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left">
                                <h5 className="text-[#3b3f5c] text-[22px] md:text-[48px] font-semibold mb-2 dark:text-white-light">Digital Business Card</h5>
                                <p className="mb-2 text-white-dark text-lg mt-5">Design your digital visiting card today</p>
                                <p className="font-semibold text-white-dark mt-4 sm:mt-8">
                                    {userInfo && (
                                        <>
                                            {' '}
                                            {userInfo.isAdmin ? (
                                                <button type="button" className="rounded-lg py-2 px-5 bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 text-white" onClick={handleClick}>
                                                    Create Your Card Today
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="rounded-lg py-2 px-5 bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 text-white"
                                                    onClick={handleClickUser}
                                                >
                                                    Create Your Card Today
                                                </button>
                                            )}
                                        </>
                                    )}
                                </p>
                            </div>

                            <div className="overflow-hidden">
                                <img src="/assets/images/digital-card.png" alt="profile" className="w-60 mt-5 object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal for withdraw wallet amount */}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Contact Us Modal" className="modal-content" overlayClassName="modal-overlay">
                {/* <div className="relative flex items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16"> */}
                <div className="relative w-full max-w-[550px] rounded-md bg-gray-800 p-2 dark:bg-[#0E1726]">                        <div className="relative flex flex-col justify-center rounded-md bg-gray-900 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[250px] py-05">
                            {' '}
                            <div className="mx-auto w-full max-w-[440px]">
                                <div className="mb-6">
                                    {' '}
                                    <button
                                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                        onClick={() => {
                                            closeModal();
                                            setMessage('');
                                        }}
                                    >
                                        <IconX />
                                    </button>
                                    <h1 className="text-3xl font-extrabold uppercase leading-snug text-primary md:text-2xl">Withdraw Amount</h1>
                                    <p className="text-base font-bold leading-normal text-white-dark mt-2">You can only able to withdraw amount below ${userInfo && userInfo.earning.toFixed(2)}</p>
                                    <p className="text-base font-bold leading-normal text-danger-dark" style={{ color: 'red' }}>
                                        {message}
                                    </p>
                                </div>
                                <form className="space-y-5">
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Amount"
                                            type="number"
                                            step="0.01"
                                            placeholder="Enter amount"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            value={amount}
                                            onChange={(e) => {
                                                setAmount(e.target.value);
                                                setMessage('');
                                            }}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconCreditCard fill={true} />
                                        </span>
                                    </div>

                                    <div className="flex justify-end space-x-4 mt-6">
                                        {' '}
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => {
                                                closeModal();
                                                setMessage('');
                                                setAmount('')
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-gradient"
                                            disabled={isLoadingButton}
                                            onClick={() => {
                                                handleWithrawAmount();
                                            }}
                                        >
                                            {isLoadingButton ? 'Loading...' : 'Withdraw'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    {/* </div> */}
                </div>
            </Modal>
        </div>
    );
};

export default Finance;
