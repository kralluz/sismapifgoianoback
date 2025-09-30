const fetch = require('node-fetch');

async function testDeleteRoom() {
  try {
    const response = await fetch('http://localhost:3000/api/room/1', {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer dev-token-for-testing',
        'Content-Type': 'application/json'
      }
    });

    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);

    if (response.status === 204) {
      console.log('✅ Sala deletada com sucesso!');
    } else {
      const error = await response.json();
      console.log('❌ Erro:', error);
    }
  } catch (error) {
    console.error('Erro na requisição:', error.message);
  }
}

testDeleteRoom();