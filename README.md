# LinkedIn Sales Navigator – Custom Filter UI (RapidAPI Integration)

This project is a sleek, interactive **filter-based UI panel** that simulates key functionality of **LinkedIn Sales Navigator**, allowing users to manually apply advanced filters (like Job Title, Company, Location, and Experience Level) to refine search results.

It demonstrates **real-world integration of RapidAPI**, a responsive **dark-mode UI**, and smart filtering UX design — all built using **Next.js**, **TypeScript**, and **custom CSS** (no Tailwind).

---

## 🚀 What This Project Is

A frontend UI system that mimics advanced filter logic of professional tools like LinkedIn Sales Navigator, powered by live suggestion APIs via [RapidAPI](https://rapidapi.com/mgujjargamingm/api/linkedin-sales-navigator-no-cookies-required).

> You type – it suggests options from the API.  
> You select – it adds filter chips.  
> You toggle – it switches between **include/exclude**.

This behavior is fully dynamic and designed to be used in search, recommendation, and CRM platforms.

---

## 💡 Why This Project Matters

🔍 **User Intent Simulation**: Captures how real-world recruiters or sales reps filter data on platforms like LinkedIn.

🧠 **RapidAPI Integration**: Demonstrates API-driven suggestions without browser cookies or LinkedIn login.

🎨 **Polished UI/UX**: Built to match modern SaaS design — chips, hover effects, shadow depth, and scrollbar customization.

📦 **Modular Design**: Componentized architecture (`FilterSection`, `FilterChip`, `SuggestionDropdown`, etc.) makes it scalable for future filters like "Industry", "Seniority", etc.

---

## 🛠️ How It Works

- **Input Box**: As users type, a debounced request is sent to the appropriate API endpoint.
- **Suggestions Dropdown**: Rendered below the input box with `Include` / `Exclude` actions.
- **Filter Chips**: Added below the filter label, showing current filter state. Toggling flips inclusion/exclusion; clicking the close icon removes the chip.
- **API Endpoints Used**:
  - `/filter_job_title_suggestions`
  - `/filter_company_suggestions`
  - `/filter_geography_location_region_suggestions`
  - `/filter_years_in`

---

## 🧩 Key Technologies

- **Next.js (App Router)** for structure and performance
- **TypeScript** for type safety and DX
- **Custom CSS (Dark Theme)** for visual fidelity (no Tailwind or Bootstrap)
- **RapidAPI** for external data integration
- **Debounce** and state management using `useEffect`, `useState`, and `useRef`

---

## 📌 Project Structure Highlights

src/
├── components/
│ ├── FilterSection.tsx
│ ├── FilterChip.tsx
│ └── SuggestionDropdown.tsx
├── pages/
│ └── api/ // API proxy routes for server-side fetches
├── styles/
│ └── filters.module.css // Dark theme, scrollbars, rounded UIs
