# Publikacja

## Przed wdrożeniem

1. Ustaw zmienne środowiskowe według `.env.example` na platformie docelowej.
2. Ustaw `VITE_SITE_URL` na publiczny adres bez końcowego ukośnika, np. `https://example.com`.
   Dzięki temu canonical URL i obraz udostępniany w social media będą miały pełne adresy.
3. Potwierdź, że obie migracje z `supabase/migrations` zostały zastosowane w projekcie Supabase.
4. Uruchom kontrolę wydania:

   ```sh
   npm install
   npm run check
   ```

## Po wdrożeniu

1. Otwórz stronę główną i nieistniejący adres; oczekiwane statusy to odpowiednio `200` i `404`.
2. Wyślij jedno kontrolowane zgłoszenie formularza i potwierdź rekord w tabeli `public.leads`.
3. Sprawdź podgląd linku w narzędziach dla Open Graph po ustawieniu domeny.
4. Potwierdź finalne ceny, koszt wysyłki, nakład oraz treść informacji o przetwarzaniu danych.

Nie zapisuj prawdziwych wartości z `.env` w repozytorium.
