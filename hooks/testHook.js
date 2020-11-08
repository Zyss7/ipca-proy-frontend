const testHook = (value = null) => {
  //x124
  const data = {
    value: value,
  };

  const setter = (newValue) => {
    //x125
    Object.assign(data, { value: newValue });
  };

  return [data.value, setter];
};

export default testHook;

const [usuario, setUsuario] = testHook("1");

setUsuario("1");

const numeros = [1, 2, 3, 4, 5, 6];
