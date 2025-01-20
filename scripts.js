// Função para buscar a cotação atual da moeda.
async function getCurrencyQuote(currency) {
	try {
	  const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${currency}-BRL`);
	  if (!response.ok) throw new Error("Error accessing API.");
  
	  const data = Object.values(await response.json());
	  return Number.parseFloat(data[0].bid);
	} catch (error) {
	  console.error("Error:", error.message);
	  alert("Erro ao obter a cotação atual da moeda. Por favor, tente novamente mais tarde.");
	}
  }
  
// Obtendo os elementos do formulário.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
	const hasCharactersRegex = /\D+/g;
	amount.value = amount.value.replace(hasCharactersRegex, "");
});

// Capturando o evento de submit (enviar) do formulário.
form.onsubmit = async (event) => {
	event.preventDefault();
	switch (currency.value) {
		case "USD":
			convertCurrency(amount.value, await getCurrencyQuote(currency.value), "US$");
			break;
		case "EUR":
			convertCurrency(amount.value, await getCurrencyQuote(currency.value), "€");
			break;
		case "JPY":
			convertCurrency(amount.value, await getCurrencyQuote(currency.value), "¥");
			break;
		case "GBP":
			convertCurrency(amount.value, await getCurrencyQuote(currency.value), "£");
			break;
		case "CNY":
			convertCurrency(amount.value, await getCurrencyQuote(currency.value), "C¥");
			break;
		case "CAD":
			convertCurrency(amount.value, await getCurrencyQuote(currency.value), "CA$");
			break;
		case "AUD":
			convertCurrency(amount.value, await getCurrencyQuote(currency.value), "AU$");
			break;
		case "CHF":
			convertCurrency(amount.value, await getCurrencyQuote(currency.value), "₣");
			break;
		case "INR":
			convertCurrency(amount.value, await getCurrencyQuote(currency.value), "₹");
			break;
		case "MXN":
			convertCurrency(amount.value, await getCurrencyQuote(currency.value), "MX$");
			break;
		case "ARS":
			convertCurrency(amount.value, await getCurrencyQuote(currency.value), "AR$");
			break;
		case "ZAR":
			convertCurrency(amount.value, await getCurrencyQuote(currency.value), "R");
			break;
		case "SGD":
			convertCurrency(amount.value, await getCurrencyQuote(currency.value), "S$");
			break;
		case "PEN":
			convertCurrency(amount.value, await getCurrencyQuote(currency.value), "S/");
			break;
	}
};

// Função para converter a moeda.
function convertCurrency(amount, price, currency) {
	try {
		// Exibindo a cotação da moeda selecionada.
		description.textContent = `${currency} 1 = ${formatCurrencyBRL(price)}`;

		// Calcula o total.
		let total = amount * price;

		// Formatar o valor total.
		total = formatCurrencyBRL(total).replace("R$", "");

		// Exibe o resultado total.
		result.textContent = `${total} Reais`;

		// Aplica a classe que exibe o footer para mostrar o resultado.
		footer.classList.add("show-result");
	} catch (error) {
		// Remove a classe do footer removendo ele da tela.
		footer.classList.remove("show-result");
		console.log(error);
		alert("Não foi possível converter. Tente novamente mais tarde.");
	}
}
// Formata a moeda em Real Brasileiro.
function formatCurrencyBRL(value) {
	// Converte moeda para número para utilizar o toLocaleString para formatar no padrão BRL (R$)
	return Number(value).toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});
}
