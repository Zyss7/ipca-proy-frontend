import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "@assets/css/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery";
import moment from "moment";
import "moment/locale/es";
import "popper.js";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/nova-light/theme.css";
import { ToastProvider } from "react-toast-notifications";
moment.locale("es");

const client = new ApolloClient({
  uri: "https://pacific-anchorage-97875.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
    },
  },
});

export default function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={6000}
      placement="bottom-right"
    >
      <ApolloProvider client={client}>
        <Component {...{ ...pageProps }} />
      </ApolloProvider>
    </ToastProvider>
  );
}

/** 
 import '@/assets/css/dataTable.scss';
import '@/assets/css/navbar.scss';
import '@/assets/css/root-styles.scss';
import '@/assets/css/vars.scss';
*/
