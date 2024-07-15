import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";
import { http, WagmiProvider, createConfig } from "wagmi";

import Layout from "./components/layout";

import { celo, celoAlfajores } from "wagmi/chains";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/home";

import SignUp from "./pages/auth/signup";
import Landing from "./pages/landing";
import { Routes, Route } from "react-router-dom";
import CampaignDetail from "./pages/campain_detail";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [injectedWallet],
    },
  ],
  {
    appName: "Celo Composer",
    projectId: "044601f65212332475a09bc14ceb3c34",
  }
);

const config = createConfig({
  connectors,
  chains: [celo, celoAlfajores],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" exact  element={<Landing />} />
                <Route path="/detail/1" exact  element={<CampaignDetail />} />
              </Route>

              {/* <Route path="/" element={<MainDashboard />}>
                    <Route path="/dashboard" element={<Overview />}/>

                    <Route path="/users" element={<Users />}>
                        <Route path={`/users`} element={<UsersList />} />
                        <Route path={`/users/add`} element={<UsersAdd />} />
                        <Route path={`/users/:userId`} element={<UsersListItemDetail />} />
                    </Route>

                    <Route path="/cards" element={<Cards />}>
                        <Route path={`/cards`} element={<CardsList />} />
                        <Route path={`/cards/add`} element={<CardsAdd />} />
                        <Route path={`/cards/:cardId`} element={<CardsListItemDetail />} />
                    </Route>

                    <Route path="/roles" element={<Roles />} />
                    <Route path="/business_categories" element={<BusinessCategories />} />
                    <Route path="/pricings" element={<Pricings />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/report_reasons" element={<ReportReasons />} />
                    <Route path="/report_resolutions" element={<ReportResolutions />} />
                    <Route path="/card_designs" element={<CardDesigns />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/order_statuses" element={<OrderStatuses />} />
                    <Route path="/transaction_statuses" element={<TransactionStatuses />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/approvals" element={<Approvals />} />
                    <Route path="/profile" element={<Profile />} />
                </Route> */}

              {/* <Route path="/signin" element={<SignIn />}/>
                <Route path="/signup" element={<SignUp />}/> */}

              {/*<Route path="/pay/order/:cardId" element={<Pay />} />*/}
              {/* <Route path="/payment/success" element={<Pay isSuccess={true}/>} />
                <Route path="/payment/cancel" element={<Pay isSuccess={false}/>} /> */}
              {/* <Route path="*" element={<PageNotFound />}/> */}
            </Routes>

            {/* <Layout>
              <SignUp />

              <Landing />

              <Home />
            </Layout> */}
            
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
