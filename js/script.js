document.getElementById('searchBtn').addEventListener('click', async () => {
  
  const input = document.getElementById('pokemonInput').value.toLowerCase().trim();
  
  const container = document.getElementById('pokemonContainer');
  
  const errorMsg = document.getElementById('errorMsg');

  if (!input) return;

  try {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    if (!response.ok) throw new Error('Pokémon não encontrado!');

    const data = await response.json();

    document.getElementById('pokemonSprite').src = data.sprites.front_default;
    document.getElementById('pokemonName').textContent = data.name.toUpperCase();
    
    document.getElementById('pokemonType').textContent = `Tipo: ${data.types.map(t => t.type.name).join(', ')}`;

    container.classList.remove('hidden');
    errorMsg.textContent = '';
  } catch (error) {
    container.classList.add('hidden');
    errorMsg.textContent = error.message;
  }
});
