# iTELL C-Test Pilot

A pilot testing application for the C-Test feature of the iTELL intelligent textbook platform. This application allows users to test different visual presentations of c-tests (box style, underline style, and span style) with both simplified and standard text.

## Project Structure

This project is built with Next.js and uses the following technologies:

- **Next.js 13+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Compromise** and **SBD** for NLP tasks (sentence detection, etc.)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/vnthanhdng/itell-ctest-pilot.git
cd itell-ctest-pilot
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## C-Test Styles

This pilot tests three different styles of c-tests:

1. **Box Style**: Individual input boxes for each missing letter
2. **Underline Style**: Individual underlines for each missing letter
3. **Span Style**: A single underline for all missing letters in a word

Each style is tested with both simplified and standard text versions.

## Deployment

This project can be easily deployed on Vercel:

1. Push your repository to GitHub
2. Import the project in Vercel
3. Deploy

## Data Collection

Test results are stored in JSON files in the `/data` directory. In a production environment, this would be replaced with a database solution.

## Admin Dashboard

An admin dashboard is available at `/admin` to view test results and analyze performance across different c-test styles and text types.

## License

[MIT](LICENSE)