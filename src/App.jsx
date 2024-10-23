import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddDelete from './pages/AddDelete';  // Adjust the path based on your folder structure

function App() {
    return (
        <Router>
            <Routes>

              {}
              <Route path="/" element={<AddDelete />} />

                {/* Route to Add/Delete Events page */}
                <Route path="/add-delete" element={<AddDelete />} />
                
                {/* Optionally add a default route */}
                <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
        </Router>
    );
}

export default App;
