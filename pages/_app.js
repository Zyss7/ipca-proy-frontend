import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "@assets/css/global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery";
import moment from "moment";
import "moment/locale/es";
import "popper.js";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
//import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import { ToastProvider } from "react-toast-notifications";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
moment.locale("es");

const client = new ApolloClient({
  uri: "https://straw-berry-py.herokuapp.com/graphql",
  cache: new InMemoryCache({ addTypename: false }),
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
      placement='bottom-right'>
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
