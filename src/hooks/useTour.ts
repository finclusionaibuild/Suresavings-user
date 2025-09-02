import { useState, useEffect } from 'react';

interface TourState {
  isActive: boolean;
  currentPage: string;
  hasSeenTour: boolean;
  completedPages: string[];
}

export const useTour = () => {
  const [tourState, setTourState] = useState<TourState>({
    isActive: false,
    currentPage: '',
    hasSeenTour: false,
    completedPages: []
  });

  useEffect(() => {
    // Check if user has seen the tour
    const tourData = localStorage.getItem('suresavings_tour');
    if (tourData) {
      const parsed = JSON.parse(tourData);
      setTourState(prev => ({
        ...prev,
        hasSeenTour: parsed.hasSeenTour || false,
        completedPages: parsed.completedPages || []
      }));
    }
  }, []);

  const startTour = (page: string) => {
    setTourState(prev => ({
      ...prev,
      isActive: true,
      currentPage: page
    }));
  };

  const completeTour = () => {
    const newCompletedPages = [...tourState.completedPages];
    if (!newCompletedPages.includes(tourState.currentPage)) {
      newCompletedPages.push(tourState.currentPage);
    }

    const newTourState = {
      isActive: false,
      currentPage: '',
      hasSeenTour: true,
      completedPages: newCompletedPages
    };

    setTourState(newTourState);
    
    // Save to localStorage
    localStorage.setItem('suresavings_tour', JSON.stringify({
      hasSeenTour: true,
      completedPages: newCompletedPages
    }));
  };

  const closeTour = () => {
    setTourState(prev => ({
      ...prev,
      isActive: false,
      currentPage: ''
    }));
  };

  const shouldShowTour = (page: string) => {
    return !tourState.completedPages.includes(page);
  };

  const resetTour = () => {
    setTourState({
      isActive: false,
      currentPage: '',
      hasSeenTour: false,
      completedPages: []
    });
    localStorage.removeItem('suresavings_tour');
  };

  return {
    tourState,
    startTour,
    completeTour,
    closeTour,
    shouldShowTour,
    resetTour
  };
};