package com.restaurante.modelos.servicios;

import com.restaurante.modelos.entidades.Reserva;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.base-url}")
    private String baseUrl;

    public void enviarEmailConfirmacion(Reserva reserva) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(reserva.getEmail());
            helper.setSubject("Confirme su reserva - Gestion Restaurante");

            String urlConfirmacion = baseUrl + "/confirmar-reserva?token=" + reserva.getTokenConfirmacion();

            String htmlBody = "<h2>¡Hola " + reserva.getNombre() + "!</h2>"
                    + "<p>Hemos recibido una solicitud de reserva para el <b>"
                    + reserva.getFechaHora().toLocalDate() + "</b> a las <b>"
                    + reserva.getFechaHora().toLocalTime() + "</b> para <b>"
                    + reserva.getComensales() + " personas</b>.</p>"
                    + "<p>Por favor, confirma tu reserva haciendo clic en el siguiente enlace:</p>"
                    + "<a href=\"" + urlConfirmacion
                    + "\" style=\"display: inline-block; padding: 10px 20px; color: white; background-color: #8B1A1A; text-decoration: none; border-radius: 5px;\">Confirmar Reserva</a>"
                    + "<p>Si no has solicitado esta reserva, puedes ignorar este correo.</p>";

            helper.setText(htmlBody, true);

            mailSender.send(message);

        } catch (Exception e) {
            System.err.println(
                    "Error al enviar el email de confirmación a " + reserva.getEmail() + ": " + e.getMessage());
        }
    }
}
