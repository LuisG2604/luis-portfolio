<!--ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir-->

<template>
  <div class="modal-overlay">
    <div class="verification-modal">
      <h2>Vérification par Email</h2>
      <p v-if="codeSent">Un code de vérification a été envoyé à <strong>{{ email }}</strong>.</p>
      <p v-else>Appuyez sur "Envoyer" pour recevoir votre code.</p>

      <div class="form-group">
        <input type="text" v-model="verificationCode" placeholder="Entrez le code" maxlength="6" />
        <p v-if="error" class="error">{{ error }}</p>
      </div>

      <div class="button-group">
        <button v-if="!codeSent" @click="sendCode" class="btn-primary">Envoyer</button>
        <button v-else @click="resendCode" class="btn-secondary">Renvoyer</button>
        <button @click="verifyCode" class="btn-success" :disabled="!codeSent">Confirmer</button>
        <button @click="closeModal" class="btn-cancel">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "@/api/axiosConfig";

const props = defineProps(["email"]);
const emit = defineEmits(["close"]);

const verificationCode = ref("");
const generatedCode = ref(null);
const error = ref("");
const codeSent = ref(false);

const sendCode = async () => {
  try {
    const response = await axios.post("/api/send-verification", { email: props.email });
    generatedCode.value = response.data.code;
    codeSent.value = true;
    error.value = "";
  } catch (err) {
    console.error("Erreur lors de l'envoi du code:", err);
    error.value = "Erreur lors de l'envoi du code.";
  }
};

const verifyCode = () => {
  if (verificationCode.value === generatedCode.value) {
    emit("verified");
    emit("close");
  } else {
    error.value = "Code incorrect, veuillez réessayer.";
  }
};

const resendCode = async () => {
  verificationCode.value = "";
  error.value = "";
  await sendCode();
};

const closeModal = () => {
  emit("close");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.verification-modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  text-align: center;
}

.form-group {
  margin-top: 10px;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 3px;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-primary {
  background: #28a745 !important;
  color: white;
}
.btn-primary:hover {
  background: #166e2b !important;
  color: white;
}

.btn-secondary {
  background: #ffc107;
  color: black;
}

.btn-secondary:hover {
  background: #c49300;
  color: black;
}
.btn-success {
  background: #28a745;
  color: white;
}
.btn-success:hover {
  background: #166e2b;
  color: white;
}

.btn-success:disabled{
  background: #a3a3a3;
  color: rgb(0, 0, 0);
  
}
.btn-cancel {
  background: #dc3545;
  color: white;
}
.btn-cancel:hover {
  background: #971d2a;
  color: white;
}
</style>
  