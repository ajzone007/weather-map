import React from 'react';
import { locations } from '../../constants/constants'
import { connect } from 'react-redux';
import { getWeather } from '../../actions/actions';
import './weather.scss';
import moment from 'moment';
import { Chart } from 'react-google-charts';


export class WeatherView extends React.Component {
    constructor(props) {
        super(props);
        this.onlocationClick = this.onLocationClick.bind(this);
        this.renderWeatherReport = this.renderWeatherReport.bind(this);
        this.renderLocationPicker = this.renderLocationPicker.bind(this);
    }

    onLocationClick(location) {
        this.props.getWeather(location);
    }

    renderWeatherReport() {
        const { weatherReport, selectedLocation } = this.props;
        if (weatherReport.loading || !weatherReport.data) {
            return;
        }
        return (
            <div className="weather-report-container">
                <div className="weather-report-heading">
                    <span className="location-label">{selectedLocation.name}</span>
                </div>
                <div className="separator"></div>
                <div className="weather-report">
                    {
                        weatherReport.data.map((report, index) => {
                            return (
                                <div key={index} className="daily-weather-report">
                                    <span className="day-label">{moment(report.date).format('DD. dddd')}</span>
                                    <div className="temp-wrapper max-temp-wrapper">
                                        <div className="temp">{report.day.maxtemp_c} &deg;</div>
                                        <div className="temp-label">Max</div>
                                    </div>
                                    <div className="temp-wrapper min-temp-wrapper">
                                        <div className="temp">{report.day.mintemp_c} &deg;</div>
                                        <div className="temp-label">Min</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    renderLocationPicker() {
        const { selectedLocation } = this.props;
        return (<div className="location-container" >
            <div className="location-picker">
                {
                    locations.map((location, index) => {
                        return (
                            <div key={index} className={`location ${selectedLocation && selectedLocation.id === location.id && 'selected'}`} onClick={() => { this.onLocationClick(location) }}>
                                <i className="fas fa-map-marker-alt"></i>
                                <div className="location-name">{location.name}</div>
                                <div className="location-position">
                                    <span>Lat {location.position.lat}</span>
                                    <span>Long {location.position.lng}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>)
    }

    renderWeatherChart() {
        const { weatherReport } = this.props;
        if (weatherReport.loading || !weatherReport.data) {
            return;
        }

        let chartData = [['label', 'maxTemp']];
        weatherReport.data.forEach(forecast => {

            let row = [
                moment(forecast.date).format('DD. ddd'),
                forecast.day.maxtemp_c
            ];

            chartData.push(row);
        })

        return (
            <div className="chart-container">
                <div className="chart-heading">
                    <span className="chart-label"> Weekly Forecast</span>
                </div>
                <div className="separator"></div>
                <div className="chart-wrapper">
                    <Chart
                        chartType="ColumnChart"
                        loader={<div>Loading Chart</div>}
                        data={chartData}

                        options={{
                            height: '100%',
                            width: '100%',
                            chartArea: { width: '100%', height: '90%' },
                            colors: ['#f0ae29'],
                            vAxes: {
                                0: {
                                    textPosition: 'none',
                                    gridlines: {
                                        color: 'transparent'
                                    },
                                    baselineColor: 'transparent'
                                },
                                1: {
                                    gridlines: {
                                        color: 'transparent'
                                    }
                                }
                            },
                            legend: { position: 'none' },
                        }}
                    />
                </div>
            </div>)
    }

    render() {
        return (
            <div className="weather-container">
                <div className="column">
                    {this.renderLocationPicker()}
                    {this.renderWeatherChart()}
                </div>
                <div className="column">
                    {this.renderWeatherReport()}
                </div>
            </div>)
    }
}




function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        getWeather: (location) => { dispatch(getWeather(location)); }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(WeatherView);