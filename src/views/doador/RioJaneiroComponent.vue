<template>
  <div class="filtro">
    <div class="categorias">
      <router-link to="/doador-ong-amazonia">
        <Doador-ong-amazonia />
        <img src="@/assets/Amazonia.png" alt="amazonia" />
        <p>Amazônia</p>
      </router-link>
      <router-link to="/doador-ong-riojaneiro">
        <Doador-ong-riojaneiro />
        <img src="@/assets/RioJaneiro.png" alt="RioJaneiro" />
        <p>Rio de Janeiro</p>
      </router-link>
      <router-link to="/doador-ong-matogrosso">
        <Doador-ong-matogrosso />
        <img src="@/assets/MatoGrosso.png" alt="MatoGrosso" />
        <p>Mato Grosso</p>
      </router-link>
    </div>
  </div>

  <div class="containerong">
    <div class="containerong-item">
      <div class="picture">
        <img src="@/assets/Amazonia.png" alt="amazonia">
      </div>  
      <div class="nameong">
        <p>ONG X</p>
        <p>Objetivos: texto de exemplo...</p> 
      </div>
    </div>

    <div class="containerong-item">
      <div class="picture">
        <img src="@/assets/Amazonia.png" alt="amazonia">
      </div>  
      <div class="nameong">
        <p>ONG X</p>
        <p>Objetivos: texto de exemplo...</p> 
      </div>
    </div>
    <div class="containerong-item">
      <div class="picture">
        <img src="@/assets/Amazonia.png" alt="amazonia">
      </div>  
      <div class="nameong">
        <p>ONG X</p>
        <p>Objetivos: texto de exemplo...</p> 
      </div>
    </div>
    <div class="form-box">
      <form action="#">
        <div class="ong-container">
          <div class="lados">
            <img src="@/assets/profile.png" style="margin: auto" height="100%" width="80%" alt="profile">
            <div class="input-group-ong">
              <input type="text" id="nome" name="nome" placeholder="Nome da ONG:" required>
            </div>
            <div class="input-group-ong">
              <input type="tel" id="telefone" name="telefone" placeholder="Telefone:" required>
            </div>
            <div class="input-group-ong">
              <input type="number" id="cnpj" name="cnpj" placeholder="CNPJ:" required>
            </div>
          </div>
          <div class="lados">
            <div class="input-group-ong">
              <input type="text" id="causa" name="causa" placeholder="Causa:" required>
            </div>
            <div class="input-group-ong">
              <input type="text" id="cidade" name="cidade" placeholder="Cidade:" required>
            </div>
            <div class="input-group-ong">
              <input type="number" id="numero" name="numero" placeholder="Número:" required>
            </div>
            <div class="input-group-ong">
              <input type="text" id="bairro" name="bairro" placeholder="Bairro:" required>
            </div>
            <div class="input-group-ong">
              <input type="text" id="cep" name="cep" placeholder="CEP:" required>
            </div>
            <button type="submit">Enviar</button>
          </div>
        </div>
      </form>
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
</template>
