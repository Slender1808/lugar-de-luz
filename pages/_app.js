import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "next-auth/client";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

// This setup is only needed once per application;
const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://lugar-de-luz.hasura.app/v1/graphql",
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ApolloProvider>
  );
}

export default MyApp;
