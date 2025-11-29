import { Cloud, Droplets, Wind } from 'lucide-react';

const WeatherWidget = ({ current, forecast }) => {
    if (!current) return null;

    return (
        <div className="space-y-6">
            {/* Current Weather */}
            <div className="bg-white border border-soft-gray rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-primary-text">{current.name}, {current.sys.country}</h2>
                        <p className="text-secondary-text capitalize font-medium">{current.weather[0].description}</p>
                    </div>
                    <div className="text-5xl font-bold text-primary-text">{Math.round(current.main.temp)}°</div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div className="bg-soft-gray rounded-xl p-3">
                        <Wind className="mx-auto mb-1 text-yellow-accent" size={20} />
                        <span className="text-sm text-primary-text font-medium">{current.wind.speed} m/s</span>
                    </div>
                    <div className="bg-soft-gray rounded-xl p-3">
                        <Droplets className="mx-auto mb-1 text-yellow-accent" size={20} />
                        <span className="text-sm text-primary-text font-medium">{current.main.humidity}%</span>
                    </div>
                    <div className="bg-soft-gray rounded-xl p-3">
                        <Cloud className="mx-auto mb-1 text-yellow-accent" size={20} />
                        <span className="text-sm text-primary-text font-medium">{current.clouds.all}%</span>
                    </div>
                </div>
            </div>

            {/* Forecast Preview (Next 5 items ~ 15 hours) */}
            {forecast && (
                <div className="bg-white rounded-xl p-6 border border-soft-gray shadow-sm">
                    <h3 className="text-lg font-bold text-primary-text mb-4">Forecast</h3>
                    <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
                        {forecast.list.slice(0, 8).map((item, idx) => (
                            <div key={idx} className="flex-shrink-0 text-center min-w-[80px]">
                                <p className="text-xs text-secondary-text mb-1 font-medium">
                                    {new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                                <img
                                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                    alt={item.weather[0].main}
                                    className="w-10 h-10 mx-auto"
                                />
                                <p className="font-bold text-primary-text">{Math.round(item.main.temp)}°</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherWidget;
