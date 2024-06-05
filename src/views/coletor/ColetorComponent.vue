<template>
    <div>
  
  
          <div  class="container-entrega">
        
            <div class="box-entrega">
            <p>Doador: Karina OhARA CPF: 42028602884s</p>
            <p>Endereço:Rua, nº Numero, Cidade, cep:98400000  </p>
            <input type="radio" placeholder="retirado">
            <input type="radio" placeholder="Entregue">
          </div>
          <div class="box-entrega">
            <p>Doador: Karina OhARA CPF: 42028602884s</p>
            <p>Endereço:Rua, nº Numero, Cidade, cep:98400000  </p>
            <input type="radio" placeholder="retirado">
            <input type="radio" placeholder="Entregue">
        </div>
    </div>

    
    <div class="cont">
      <div class="lados">
        <img src="@/assets/logo.png" width="200px" alt="logo">
      </div>
      <div class="lados">
        <p>
          Site de doações para desastres naturais. Em tempos de crise, cada gesto de solidariedade faz uma enorme diferença. Junte-se a nós para apoiar comunidades afetadas por desastres ao redor do mundo.
        </p>
      </div>
      <div class="lados">
        <p>E-mail:Centro@gmail.com</p>
        <p>Telefone:55 98783-46655</p>
        <div class="icons">
          <div class="lados">
            <img src="@/assets/whats.png" alt="whatsapp">
          </div>
          <div class="lados">
            <img src="@/assets/instagram.png" alt="instagram">
          </div>
          <div class="lados">
            <img src="@/assets/facebook.png " alt="facebook">
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import apiClient from '@/axios';
  
  export default {
    data() {
      return {
    
        pontoData: {
          nome: '',
          telefone: '',
          endereco:{
          cep: '',
          estado: '',
          cidade: '',
          rua: '',
          bairro: '',
          numero: ''
          }
        },
      
        pontos: []
      };
    },
   
  }
  </script>