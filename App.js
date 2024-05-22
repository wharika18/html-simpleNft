

import { ethers } from "./ethers-5.6.esm.min.js";

import { abi, contractAddress } from "./constants.js";

const App = {
    contract: {},
    init: async function () {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        App.contract = contract;
        App.owner = await signer.getAddress();

        App.bindEvents();

    },

    bindEvents: function () {

        const profileForm = document.getElementById("profileForm");
        const withdrawButton = document.getElementById("withdraw");


        withdrawButton.addEventListener("click", App.handleWithdrawal);

        profileForm.addEventListener("submit", App.handleProfileCreation);


    },


    handleProfileCreation: async function (event) {
        event.preventDefault();

        const NftName = document.getElementById("Nftname").value;
        const NftSymbol = document.getElementById("Nftsymbol").value;

        try {
            await new App.contract(NftName, NftSymbol);
            alert("Profile  added successfully!");
        } catch (error) {
            console.error("Error adding proifile", error);
            alert("Error adding profile. Please try again.");
        }
    },

    handleWithdrawal: async function (event) {
        event.preventDefault();

        try {
            const result = await App.contract.withdraw({ from: App.owner });


            if (result.receipt.status) {

                alert("Withdrawal successful!");

            } else {
                alert("Withdrawal failed. Please try again.");
            }
        } catch (error) {
            console.error("Error withdrawing:", error);
            alert("Error withdrawing. Please try again.");
        }
    }

};




document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("load", function () {
        App.init();
    });
});
