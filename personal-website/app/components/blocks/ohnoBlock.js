import { useState, useEffect } from 'react';

const cardsData = [
    { id: 1, emoji: '🐶' },
    { id: 2, emoji: '🐱' },
    { id: 3, emoji: '🦊' },
    { id: 4, emoji: '🐻' },
    { id: 5, emoji: '🐼' },
    { id: 6, emoji: '🐨' },
];

// Shuffle and double cards for pairs
function shuffleCards() {
    const doubled = [...cardsData, ...cardsData];
    for (let i = doubled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
    }
    return doubled.map((card, index) => ({ ...card, uniqueId: index }));
}

export default function OhNoBlock() {
    const [cards, setCards] = useState(() => shuffleCards());
    const [flipped, setFlipped] = useState([]); // store uniqueIds of flipped cards
    const [matched, setMatched] = useState([]); // store uniqueIds of matched cards
    const [disableAll, setDisableAll] = useState(false);

    function handleCardClick(uniqueId) {
        if (disableAll) return;
        if (flipped.includes(uniqueId) || matched.includes(uniqueId)) return;

        if (flipped.length === 1) {
            // Second card flipped
            setFlipped((prev) => [...prev, uniqueId]);
            setDisableAll(true);
        } else {
            // First card flipped
            setFlipped([uniqueId]);
        }
    }

    useEffect(() => {
        if (flipped.length === 2) {
            const [firstId, secondId] = flipped;
            const firstCard = cards.find((c) => c.uniqueId === firstId);
            const secondCard = cards.find((c) => c.uniqueId === secondId);

            if (firstCard.id === secondCard.id) {
                // Match found
                setMatched((prev) => [...prev, firstId, secondId]);
                setFlipped([]);
                setDisableAll(false);
            } else {
                // Not a match - flip back after a delay
                const timeout = setTimeout(() => {
                    setFlipped([]);
                    setDisableAll(false);
                }, 1000);
                return () => clearTimeout(timeout);
            }
        }
    }, [flipped, cards]);

    function resetGame() {
        setCards(shuffleCards());
        setFlipped([]);
        setMatched([]);
        setDisableAll(false);
    }

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow text-center">
            <h2 className="text-2xl font-bold mb-4">
                Oh no, I don't have content prepared for that... <br />
                But here's a fun game for your trouble!
            </h2>

            <div className="grid grid-cols-4 gap-4 justify-center max-w-md mx-auto mb-6">
                {cards.map(({ uniqueId, emoji }) => {
                    const isFlipped = flipped.includes(uniqueId) || matched.includes(uniqueId);

                    return (
                        <div
                            key={uniqueId}
                            onClick={() => handleCardClick(uniqueId)}
                            className="relative w-20 h-28 cursor-pointer"
                            style={{ perspective: '600px' }}
                        >
                            <div
                                className={`w-full h-full rounded shadow-md relative transition-transform duration-500 transform ${isFlipped ? 'rotate-y-180' : ''
                                    }`}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Front of card */}
                                <div
                                    className="absolute w-full h-full bg-indigo-600 rounded flex items-center justify-center text-3xl text-white select-none"
                                    style={{ backfaceVisibility: 'hidden' }}
                                >
                                    ?
                                </div>
                                {/* Back of card */}
                                <div
                                    className="absolute w-full h-full bg-white rounded border border-gray-300 flex items-center justify-center text-4xl select-none"
                                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                                >
                                    {emoji}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                onClick={resetGame}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition"
            >
                Restart Game
            </button>

            <style jsx>{`
        .perspective {
          perspective: 600px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
        </div>
    );
}
