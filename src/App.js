import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePartner from "./Partner/Home";
import PartnerVoucher from "./Partner/Voucher/Home";
import CreateVoucher from "./Partner/Voucher/CreateVoucher";
import PartnerArticle from "./Partner/Article/Home";
import CreateArticle from "./Partner/Article/CreateArticle";
import PartnerGiftcard from "./Partner/Giftcard/Home";
import CreateGiftcard from "./Partner/Giftcard/CreateGiftcard";
import EditVoucher from "./Partner/Voucher/EditVoucher";
import EditArticle from "./Partner/Article/EditArticle";
import PartnerPayment from "./Partner/Payment/Home";
import Statistic from "./Partner/Payment/Statistic";

function App() {
  const [partner, setPartner] = useState("");

  useEffect(() => {
    setPartner("Kaizer Blood");
  }, []);

  return (
    <React.Fragment>
      <HomePartner partner={partner} />
      <Routes>
        <Route path="voucher/home" element={<PartnerVoucher />} />
        <Route
          path="voucher/create-voucher"
          element={<CreateVoucher partner={partner} />}
        />
        <Route path="voucher/edit-voucher/*" element={<EditVoucher />} />

        <Route path="article/home" element={<PartnerArticle />} />
        <Route
          path="article/create-article"
          element={<CreateArticle partner={partner} />}
        />
        <Route path="article/edit-article/*" element={<EditArticle />} />

        <Route path="giftcard/home" element={<PartnerGiftcard />} />
        <Route
          path="giftcard/create-giftcard"
          element={<CreateGiftcard partner={partner} />}
        />

        <Route
          path="payment/home"
          element={<PartnerPayment partner={partner} />}
        />
        <Route
          path="payment/statistic"
          element={<Statistic partner={partner} />}
        />
      </Routes>
    </React.Fragment>
  );
}

export default App;
