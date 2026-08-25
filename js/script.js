// Selecionando os elementos do HTML que vamos manipular
const searchBtn = document.getElementById('searchBtn');
const pokemonInput = document.getElementById('pokemonInput');
const pokemonCard = document.getElementById('pokemonCard');
const errorMsg = document.getElementById('errorMsg');

// Elementos onde os dados do Pokémon serão exibidos
const pokemonId = document.getElementById('pokemonId');
const pokemonName = document.getElementById('pokemonName');
const pokemonImage = document.getElementById('pokemonImage');
const pokemonTypes = document.getElementById('pokemonTypes');
const pokemonWeight = document.getElementById('pokemonWeight');
const pokemonHeight = document.getElementById('pokemonHeight');

// Função principal que consome a API (Requisito: Uso de programação assíncrona)
async function fetchPokemon(pokemon) {
  // Limpa mensagens de erro e esconde o card enquanto busca
  errorMsg.classList.add('hidden');
  pokemonCard.classList.add('hidden');

  // Requisito: Tratamento de erro (Ausência de dados no input)
  if (!pokemon) {
    showError('Por favor, digite o nome ou número de um Pokémon.');
    return;
  }

  try {
    // Requisito: Consumo da API e requisição HTTP
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    // Requisito: Tratamento de erro (Resposta inválida ou Pokémon não encontrado)
    if (!response.ok) {
      throw new Error('Pokémon não encontrado. Verifique o nome ou número e tente novamente!');
    }

    // Requisito: Interpretar a resposta no formato JSON
    const data = await response.json();

    // Requisito: Exibição dinâmica dos dados processados pelo JS
    renderPokemon(data);

  } catch (error) {
    // Requisito: Tratamento de erro (Falha de conexão ou erro no fetch)
    showError(error.message);
  }
}

// Função para exibir os dados na tela
function renderPokemon(data) {
  // Preenche o ID formatado (ex: de "25" para "#025")
  pokemonId.textContent = `#${data.id.toString().padStart(3, '0')}`;
  
  // Preenche o nome
  pokemonName.textContent = data.name;

  // Busca a imagem em alta resolução (se não achar, pega a comum)
  pokemonImage.src = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;

  // Converte peso e altura para as medidas corretas (kg e metros)
  pokemonWeight.textContent = (data.weight / 10).toFixed(1);
  pokemonHeight.textContent = (data.height / 10).toFixed(1);

  // Limpa as tipagens anteriores
  pokemonTypes.innerHTML = '';

  // Cria as tags de tipo dinamicamente
  data.types.forEach(item => {
    const typeName = item.type.name; // ex: 'fire', 'water'
    
    // Cria um elemento <span> para o tipo
    const typeSpan = document.createElement('span');
    typeSpan.textContent = typeName;
    
    // Adiciona as classes CSS criadas no style.css
    typeSpan.classList.add('type-tag', `type-${typeName}`);
    
    // Insere o span dentro do container de tipos
    pokemonTypes.appendChild(typeSpan);
  });

  // Mostra o card preenchido na tela
  pokemonCard.classList.remove('hidden');
}

// Função auxiliar para exibir mensagens de erro
function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.remove('hidden');
}

// Evento de clique no botão de buscar
searchBtn.addEventListener('click', () => {
  const inputValue = pokemonInput.value.toLowerCase().trim();
  fetchPokemon(inputValue);
});

// Evento extra: permitir buscar apertando a tecla "Enter"
pokemonInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const inputValue = pokemonInput.value.toLowerCase().trim();
    fetchPokemon(inputValue);
  }
});
