import '@assets/css/global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UsuarioProvider } from 'context/UsuarioContext';
// import "bootswatch/dist/lux/bootstrap.min.css";
import 'jquery';
import moment from 'moment';
import 'moment/locale/es';
import 'popper.js';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
//import "primereact/resources/themes/nova-light/theme.css";
//import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import { ToastProvider } from 'react-toast-notifications';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

moment.locale('es');
function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>{typeof window === 'undefined' ? null : children}</div>
  );
}
export default function MyApp({ Component, pageProps }) {
  return (
    <SafeHydrate>
      <ToastProvider autoDismiss autoDismissTimeout={6000} placement="bottom-right">
        {/* <ApolloProvider client={client}> */}
        <UsuarioProvider>
          <Component {...{ ...pageProps }} />
        </UsuarioProvider>
        {/* </ApolloProvider> */}
      </ToastProvider>
    </SafeHydrate>
  );
}
