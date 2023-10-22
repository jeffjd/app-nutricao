export const formatData = (text: string | number): string => {
  let data = new Date(text);

  let dia: string | number = data.getDate();
  let mes: string | number = data.getMonth() + 1;
  let ano = data.getFullYear();

  dia = dia < 10 ? '0' + dia : dia;
  mes = mes < 10 ? '0' + mes : mes;

  let dataFormatada = dia + '/' + mes + '/' + ano;

  return dataFormatada;
};

export const timestampData = (num: number): string => {

  const dataInicial = new Date();


  const diasParaConsulta = num;


  const dataParaConsulta = new Date(dataInicial);


  dataParaConsulta.setDate(dataParaConsulta.getDate() + diasParaConsulta);
  return dataParaConsulta.toISOString();

};