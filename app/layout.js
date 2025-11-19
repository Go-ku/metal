import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'Zambia Real Estate Hub',
  description: 'Mobile-first real estate operations hub for Zambia.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Providers>
          <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
            <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-brand-700">Zambia</p>
                <h1 className="text-3xl font-semibold text-slate-900">ZamEstate Command Center</h1>
                <p className="text-sm text-slate-500">
                  Streamlined leasing, payments, and maintenance for landlords, managers, and tenants.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-soft">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-slate-700">System Administrator</span>
              </div>
            </header>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
